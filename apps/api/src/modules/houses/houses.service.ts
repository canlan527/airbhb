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
      data: dto
    });
  }

  async deleteUserHouse(id: string, userId: string) {
    const house = await this.findHouse(id);
    this.assertOwner(house.hostId, userId);
    await this.prisma.house.delete({ where: { id: house.id } });
    return { ok: true };
  }

  async legacySection(title: string, options: { take: number; orderBy?: 'rating'; groupByCity?: boolean }) {
    const list = await this.prisma.house.findMany({
      where: { status: HouseStatus.PUBLISHED },
      orderBy: options.orderBy === 'rating' ? { rating: 'desc' } : { createdAt: 'desc' },
      take: options.take
    });
    const legacyList = list.map(toLegacyHouse);
    if (options.groupByCity) {
      return {
        title,
        subtitle: '精选城市与热门住宿',
        dest_address: ['广州', '上海', '北京', '杭州', '成都', '深圳'],
        dest_list: legacyList.reduce<Record<string, ReturnType<typeof toLegacyHouse>[]>>((acc, item) => {
          const city = item.city || '精选';
          acc[city] = acc[city] || [];
          acc[city].push(item);
          return acc;
        }, {})
      };
    }
    return {
      title,
      subtitle: '真实后端接口返回的演示数据',
      list: legacyList
    };
  }

  async legacyLongFor() {
    const cities = ['广州', '上海', '北京', '杭州', '成都', '深圳'];
    return {
      title: '你可能想去',
      subtitle: '用 NestJS + PostgreSQL 生成的目的地数据',
      list: cities.map((city, index) => ({
        city,
        price: `均价 ￥${300 + index * 80}/晚`,
        picture_url: `https://images.unsplash.com/photo-${index % 2 === 0 ? '1500530855697-b586d89ba3ee' : '1512917774080-9991f1c4c750'}?auto=format&fit=crop&w=800&q=80`
      }))
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
