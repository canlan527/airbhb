const HOP_BY_HOP_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade'
])

function getTargetUrl(req) {
  const baseUrl = process.env.API_BASE_URL

  if (!baseUrl) {
    throw new Error('Missing API_BASE_URL environment variable')
  }

  const path = Array.isArray(req.query.path) ? req.query.path.join('/') : ''
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(req.query)) {
    if (key === 'path') continue

    if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(key, item))
    } else if (value !== undefined) {
      searchParams.append(key, value)
    }
  }

  const normalizedBaseUrl = baseUrl.replace(/\/$/, '')
  const queryString = searchParams.toString()

  return `${normalizedBaseUrl}/${path}${queryString ? `?${queryString}` : ''}`
}

function getProxyHeaders(req) {
  const headers = {}

  for (const [key, value] of Object.entries(req.headers)) {
    const lowerKey = key.toLowerCase()

    if (
      HOP_BY_HOP_HEADERS.has(lowerKey) ||
      lowerKey === 'host' ||
      lowerKey === 'content-length'
    ) {
      continue
    }
    if (value !== undefined) headers[key] = value
  }

  return headers
}

function getRequestBody(req) {
  if (req.method === 'GET' || req.method === 'HEAD') return undefined
  return typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {})
}

export default async function handler(req, res) {
  let targetUrl

  try {
    targetUrl = getTargetUrl(req)
  } catch (error) {
    res.status(500).json({ message: error.message })
    return
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: getProxyHeaders(req),
      body: getRequestBody(req)
    })

    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase()

      if (
        !HOP_BY_HOP_HEADERS.has(lowerKey) &&
        lowerKey !== 'content-encoding' &&
        lowerKey !== 'content-length'
      ) {
        res.setHeader(key, value)
      }
    })

    const buffer = Buffer.from(await response.arrayBuffer())
    res.status(response.status).send(buffer)
  } catch (error) {
    res.status(502).json({
      message: 'Failed to proxy API request',
      detail: error.message
    })
  }
}
