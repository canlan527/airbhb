import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HistoriesService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.browseHistory.findMany({
      where: { userId },
      include: { house: true },
      orderBy: { viewedAt: 'desc' }
    });
  }

  async remove(id: string, userId: string) {
    await this.prisma.browseHistory.deleteMany({ where: { id, userId } });
    return { ok: true };
  }
}
