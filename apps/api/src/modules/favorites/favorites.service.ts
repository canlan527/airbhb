import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { house: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async add(houseId: string, userId: string) {
    const house = await this.prisma.house.findUnique({ where: { id: houseId } });
    if (!house) {
      throw new NotFoundException('House not found');
    }
    return this.prisma.favorite.upsert({
      where: { userId_houseId: { userId, houseId } },
      update: {},
      create: { userId, houseId },
      include: { house: true }
    });
  }

  async remove(houseId: string, userId: string) {
    await this.prisma.favorite.deleteMany({ where: { userId, houseId } });
    return { ok: true };
  }
}
