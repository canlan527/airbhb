import { PrismaClient, HouseSource, HouseStatus, UserRole } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

const imagePool = [
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
];

const cities = ['广州', '上海', '北京', '杭州', '成都', '深圳'];

function houseName(index: number, city: string) {
  const names = ['江景露台公寓', '城市中心设计师套房', '地铁旁温馨两居', '近商圈高层公寓', '老城区安静庭院', '亲子友好阳光民宿'];
  return `${city}${names[index % names.length]}`;
}

async function main() {
  const password = hashSync('123456', 10);

  const [user, host, admin] = await Promise.all([
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

  const existing = await prisma.house.count();
  if (existing === 0) {
    const houses = Array.from({ length: 36 }, (_, index) => {
      const city = cities[index % cities.length];
      const imageStart = index % imagePool.length;
      const images = [0, 1, 2, 3].map((offset) => imagePool[(imageStart + offset) % imagePool.length]);
      return {
        legacyId: `mock-${index + 1}`,
        title: houseName(index, city),
        city,
        address: `${city}市中心 ${index + 1} 号`,
        price: 260 + (index % 8) * 60,
        rating: Number((4.5 + (index % 5) * 0.1).toFixed(1)),
        coverUrl: images[0],
        imageUrls: images,
        tags: index % 2 === 0 ? ['近地铁', '可做饭', '自助入住'] : ['城市景观', '亲子友好', '长租优惠'],
        description: '这是一套用于全栈项目演示的虚构房源，包含完整的列表、详情、收藏、订单和后台管理链路。',
        bedrooms: 1 + (index % 3),
        bathrooms: 1 + (index % 2),
        reviewsCount: 20 + index * 3,
        verifyMessage: index % 2 === 0 ? '整套公寓 · 实拍房源' : '独立房间 · 超赞房东',
        source: index % 4 === 0 ? HouseSource.PLATFORM : HouseSource.USER,
        status: HouseStatus.PUBLISHED,
        hostId: index % 4 === 0 ? null : host.id
      };
    });

    await prisma.house.createMany({ data: houses });
  }

  const firstHouse = await prisma.house.findFirst({ where: { status: HouseStatus.PUBLISHED } });
  if (firstHouse) {
    await prisma.favorite.upsert({
      where: { userId_houseId: { userId: user.id, houseId: firstHouse.id } },
      update: {},
      create: { userId: user.id, houseId: firstHouse.id }
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
