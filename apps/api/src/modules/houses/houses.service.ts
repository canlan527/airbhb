import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { HouseSource, HouseStatus, UserRole } from '@prisma/client';
import { toLegacyHouse } from '../../common/legacy-house';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHouseDto, UpdateHouseDto } from './dto';

@Injectable()
export class HousesService {
  constructor(private readonly prisma: PrismaService) {}

  async publicList(params: { city?: string; page: number; pageSize: number }) {
    const page = Math.max(params.page || 1, 1);
    const pageSize = Math.min(Math.max(params.pageSize || 20, 1), 50);
    const where = {
      status: HouseStatus.PUBLISHED,
      ...(params.city ? { city: params.city } : {})
    };
    const [list, total] = await Promise.all([
      this.prisma.house.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize
      }),
      this.prisma.house.count({ where })
    ]);
    return { list, total, page, pageSize };
  }

  async publicDetail(id: string) {
    const house = await this.findHouse(id);
    if (house.status !== HouseStatus.PUBLISHED) {
      throw new NotFoundException('House not found');
    }
    return house;
  }

  async recordView(id: string, userId: string) {
    const house = await this.findHouse(id);
    await this.prisma.browseHistory.upsert({
      where: { userId_houseId: { userId, houseId: house.id } },
      update: { viewedAt: new Date() },
      create: { userId, houseId: house.id }
    });
    return { ok: true };
  }

  myHouses(userId: string) {
    return this.prisma.house.findMany({
      where: { hostId: userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createUserHouse(dto: CreateHouseDto, userId: string) {
    const house = await this.prisma.house.create({
      data: {
        ...dto,
        source: HouseSource.USER,
        status: HouseStatus.PENDING,
        hostId: userId
      }
    });
    await this.prisma.user.update({
      where: { id: userId },
      data: { role: UserRole.HOST }
    });
    return house;
  }

  async updateUserHouse(id: string, dto: UpdateHouseDto, userId: string) {
    const house = await this.findHouse(id);
    this.assertOwner(house.hostId, userId);
    return this.prisma.house.update({
      where: { id: house.id },
      data: {
        ...dto,
        status: HouseStatus.PENDING
      }
    });
  }

  async deleteUserHouse(id: string, userId: string) {
    const house = await this.findHouse(id);
    this.assertOwner(house.hostId, userId);
    await this.prisma.house.delete({ where: { id: house.id } });
    return { ok: true };
  }

  async legacySection(
    title: string,
    options: {
      take: number;
      orderBy?: 'rating';
      groupByCity?: boolean;
      section?: string;
      subtitle?: string;
      groupField?: 'city' | 'originGroup';
      groupOrder?: string[];
    }
  ) {
    const where = {
      status: HouseStatus.PUBLISHED,
      ...(options.section ? { originSections: { has: options.section } } : {})
    };
    const list = await this.prisma.house.findMany({
      where,
      orderBy: options.orderBy === 'rating' ? { rating: 'desc' } : { createdAt: 'asc' },
      take: options.groupByCity ? undefined : options.take
    });
    if (options.groupByCity) {
      const grouped = list.reduce<Record<string, ReturnType<typeof toLegacyHouse>[]>>((acc, house) => {
        const groupName = options.groupField === 'originGroup' ? house.originGroup || house.city || '精选' : house.city || house.originGroup || '精选';
        acc[groupName] = acc[groupName] || [];
        acc[groupName].push(toLegacyHouse(house));
        return acc;
      }, {});
      const groups = options.groupOrder?.filter((name) => grouped[name]?.length) || Object.keys(grouped);
      return {
        title,
        subtitle: options.subtitle || '精选城市与热门住宿',
        dest_address: groups.map((name) => ({ name })),
        dest_list: grouped
      };
    }
    const legacyList = list.map(toLegacyHouse);
    return {
      title,
      subtitle: options.subtitle || '真实接口导入到 PostgreSQL 的房源数据',
      list: legacyList
    };
  }

  async legacyLongFor() {
    return {
      title: '你可能想去',
      subtitle: '发现更多出行灵感',
      type: 'discover',
      list: [
        {
          city: '成都',
          price: '¥181/晚',
          picture_url: 'https://z1.muscache.cn/im/pictures/0aac97b6-429b-4be5-bfd8-68b0544411b3.jpg?aki_policy=large',
          image_url: '/discover/a6c47ba93252b53564a128f821831939.jpg'
        },
        {
          city: '广州',
          price: '¥218/晚',
          picture_url: 'https://z1.muscache.cn/im/pictures/e7b2259c-269e-4057-8a98-17cd421a80de.jpg?aki_policy=large',
          image_url: '/discover/43d72a8513591e4b78da3bf257803754.jpg'
        },
        {
          city: '重庆',
          price: '¥155/晚',
          picture_url: 'https://z1.muscache.cn/im/pictures/b6f7ec5d-cc44-4462-be56-a86cc37f3f9b.jpg?aki_policy=large',
          image_url: '/discover/819bc320913d086fb3eb34ce9b20ed14.jpg'
        },
        {
          city: '长沙',
          price: '¥172/晚',
          picture_url: 'https://z1.muscache.cn/im/pictures/ceb71ffa-e78e-47c5-8242-65cd122e20d1.jpg?aki_policy=large',
          image_url: '/discover/da404486a4967ca9282c72a4f9362fa9.jpg'
        },
        {
          city: '杭州',
          price: '¥172/晚',
          picture_url: 'https://z1.muscache.cn/im/pictures/7a591106-2568-403c-a644-0aa207ec5980.jpg?aki_policy=large',
          image_url: '/discover/e78e339f6f3a9467caef86797eb9c797.jpg'
        },
        {
          city: '西安',
          price: '¥158/晚',
          picture_url: 'https://z1.muscache.cn/im/pictures/826939e3-38ca-40f7-85b0-e2bed9a769e5.jpg?aki_policy=large',
          image_url: '/discover/5e694ea67774eb955c5be5753265c818.jpg'
        },
        {
          city: '深圳',
          price: '¥364/晚',
          picture_url: 'https://z1.muscache.cn/im/pictures/a8a25fe3-3fa1-44bf-8f68-04f465993f95.jpg?aki_policy=large',
          image_url: '/discover/3597b436b82803a77f384d690d0eadf2.jpg'
        },
        {
          city: '青岛',
          price: '¥208/晚',
          picture_url: 'https://z1.muscache.cn/im/pictures/f49d2dcd-faa4-4264-9ce2-0bae9d9a10c7.jpg?aki_policy=large',
          image_url: '/discover/1888dc28811b997dff91ba50af4a6ba1.jpg'
        }
      ]
    };
  }

  async legacyEntire(offset: number, size: number) {
    const where = { status: HouseStatus.PUBLISHED };
    const [list, totalCount] = await Promise.all([
      this.prisma.house.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: size
      }),
      this.prisma.house.count({ where })
    ]);
    return {
      totalCount,
      list: list.map(toLegacyHouse)
    };
  }

  private async findHouse(id: string) {
    const house = await this.prisma.house.findFirst({
      where: {
        OR: [{ id }, { legacyId: id }]
      }
    });
    if (!house) {
      throw new NotFoundException('House not found');
    }
    return house;
  }

  private assertOwner(hostId: string | null, userId: string) {
    if (hostId !== userId) {
      throw new ForbiddenException('You can only manage your own houses');
    }
  }
}
