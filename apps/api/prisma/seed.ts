import { PrismaClient, HouseSource, HouseStatus, UserRole } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

const API_BASE_URL = 'http://codercba.com:1888/airbnb/api';

type LegacyHouse = {
  id?: string | number;
  picture_url?: string;
  picture_urls?: string[];
  verify_info?: { messages?: string[] };
  name?: string;
  price?: number | string;
  price_format?: string;
  star_rating?: number;
  reviews_count?: number;
  reviews?: { comments?: string }[];
  bottom_info?: { content?: string } | null;
};

type ImportItem = {
  house: LegacyHouse;
  section: string;
  group?: string;
};

const sectionConfigs = [
  { key: 'goodprice', path: '/home/goodprice' },
  { key: 'highscore', path: '/home/highscore' },
  { key: 'discount', path: '/home/discount' },
  { key: 'hotrecommenddest', path: '/home/hotrecommenddest' },
  { key: 'plus', path: '/home/plus' }
];

const fallbackImages = [
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
];

function unique<T>(list: T[]) {
  return Array.from(new Set(list.filter(Boolean)));
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

function extractSectionItems(data: any, section: string): ImportItem[] {
  const items: ImportItem[] = [];

  if (Array.isArray(data?.list)) {
    for (const house of data.list) {
      items.push({ house, section });
    }
  }

  if (data?.dest_list && typeof data.dest_list === 'object') {
    for (const [group, houses] of Object.entries(data.dest_list)) {
      if (!Array.isArray(houses)) continue;
      for (const house of houses) {
        items.push({ house: house as LegacyHouse, section, group });
      }
    }
  }

  return items;
}

function parseNumber(value: unknown, fallback: number) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const matched = value.replace(/,/g, '').match(/\d+/);
    if (matched) return Number(matched[0]);
  }
  return fallback;
}

function parseRoomInfo(messages: string[] = []) {
  const text = messages.join(' ');
  const bedrooms = Number(text.match(/(\d+(?:\.\d+)?)室/)?.[1] || 1);
  const bathrooms = Number(text.match(/(\d+(?:\.\d+)?)卫/)?.[1] || 1);
  return {
    bedrooms: Math.max(Math.round(bedrooms), 1),
    bathrooms: Math.max(Math.round(bathrooms), 1)
  };
}

function inferCity(section: string, group?: string) {
  if (section === 'hotrecommenddest' && group) return group;
  if (section === 'goodprice' || section === 'hotrecommenddest' || section === 'plus') return '佛山';
  if (section === 'discount') return group || '重庆';
  return '广州';
}

function normalizeHouse(item: ImportItem, index: number) {
  const messages = item.house.verify_info?.messages || [];
  const images = unique([...(item.house.picture_urls || []), item.house.picture_url]);
  const tags = unique([...messages, item.house.bottom_info?.content || '']);
  const { bedrooms, bathrooms } = parseRoomInfo(messages);
  const coverUrl = images[0] || fallbackImages[index % fallbackImages.length];
  const price = parseNumber(item.house.price ?? item.house.price_format, 200 + (index % 8) * 40);
  const title = item.house.name || `精选民宿 ${index + 1}`;

  return {
    legacyId: String(item.house.id || `imported-${item.section}-${index}`),
    title,
    city: inferCity(item.section, item.group),
    address: item.group ? `佛山 · ${item.group}` : inferCity(item.section),
    price,
    rating: item.house.star_rating || 5,
    coverUrl,
    imageUrls: images.length > 0 ? images : [coverUrl],
    tags: tags.length > 0 ? tags : ['整套房源'],
    description: item.house.reviews?.[0]?.comments || `${title}，真实接口导入的演示房源。`,
    bedrooms,
    bathrooms,
    reviewsCount: item.house.reviews_count || 0,
    verifyMessage: messages.length > 0 ? messages.join(' · ') : '整套房源',
    originSections: [item.section],
    originGroup: item.section === 'hotrecommenddest' ? item.group : undefined,
    source: HouseSource.PLATFORM,
    status: HouseStatus.PUBLISHED
  };
}

async function importRemoteHouses() {
  const sectionItems: ImportItem[] = [];

  for (const config of sectionConfigs) {
    const data = await fetchJson<any>(config.path);
    sectionItems.push(...extractSectionItems(data, config.key));
  }

  const firstPage = await fetchJson<{ list: LegacyHouse[]; totalCount: number }>('/entire/list?offset=0&size=1');
  const totalCount = Math.min(firstPage.totalCount || 300, 300);
  for (let offset = 0; offset < totalCount; offset += 50) {
    const data = await fetchJson<{ list: LegacyHouse[] }>(`/entire/list?offset=${offset}&size=50`);
    for (const house of data.list || []) {
      sectionItems.push({ house, section: 'entire' });
    }
  }

  const mockHouses = await prisma.house.findMany({
    where: { legacyId: { startsWith: 'mock-' } },
    select: { id: true }
  });
  const mockHouseIds = mockHouses.map((house) => house.id);
  if (mockHouseIds.length > 0) {
    await prisma.favorite.deleteMany({ where: { houseId: { in: mockHouseIds } } });
    await prisma.browseHistory.deleteMany({ where: { houseId: { in: mockHouseIds } } });
    await prisma.order.deleteMany({ where: { houseId: { in: mockHouseIds } } });
    await prisma.house.deleteMany({ where: { id: { in: mockHouseIds } } });
  }

  let imported = 0;
  for (const [index, item] of sectionItems.entries()) {
    const data = normalizeHouse(item, index);
    const existing = await prisma.house.findUnique({ where: { legacyId: data.legacyId } });
    const shouldKeepDiscountCity = existing?.originSections.includes('discount') && item.section !== 'discount';
    const mergedOriginSections = unique([...(existing?.originSections || []), ...data.originSections]);
    await prisma.house.upsert({
      where: { legacyId: data.legacyId },
      update: {
        ...data,
        city: shouldKeepDiscountCity ? existing.city : data.city,
        address: shouldKeepDiscountCity ? existing.address : data.address,
        originSections: mergedOriginSections,
        originGroup: item.section === 'hotrecommenddest' ? data.originGroup : existing?.originGroup
      },
      create: data
    });
    imported += 1;
  }

  return imported;
}

async function main() {
  const password = hashSync('123456', 10);

  const [user, host] = await Promise.all([
    prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: { email: 'user@example.com', password, name: '普通用户', role: UserRole.USER }
    }),
    prisma.user.upsert({
      where: { email: 'host@example.com' },
      update: {},
      create: { email: 'host@example.com', password, name: '房东用户', role: UserRole.HOST }
    }),
    prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: { email: 'admin@example.com', password, name: '平台管理员', role: UserRole.ADMIN }
    })
  ]);

  const imported = await importRemoteHouses();

  const hostHouse = await prisma.house.findFirst({
    where: { originSections: { has: 'entire' }, hostId: null },
    orderBy: { reviewsCount: 'desc' }
  });
  if (hostHouse) {
    await prisma.house.update({
      where: { id: hostHouse.id },
      data: { source: HouseSource.USER, hostId: host.id }
    });
  }

  const firstHouse = await prisma.house.findFirst({ where: { status: HouseStatus.PUBLISHED } });
  if (firstHouse) {
    await prisma.favorite.upsert({
      where: { userId_houseId: { userId: user.id, houseId: firstHouse.id } },
      update: {},
      create: { userId: user.id, houseId: firstHouse.id }
    });
  }

  console.log(`Imported ${imported} remote house records.`);
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
