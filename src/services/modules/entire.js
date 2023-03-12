import request from '..'


export function getEntireRoomList(offset=0, size = 20) {
  // /entire/list?offset=0&size=20    --->偏移0 请求20条
  return request.get({
    url: '/entire/list',
    params: {
      offset,
      size,
    }
  })
}

