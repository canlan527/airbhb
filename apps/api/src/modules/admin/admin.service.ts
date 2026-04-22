import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { HouseSource, HouseStatus, OrderStatus, UserRole, UserStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHouseDto, UpdateHouseDto } from '../houses/dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async dashboard() {
    const [totalUsers, totalHouses, pendingHouses, totalOrders, paidOrders, paid] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.house.count(),
      this.prisma.house.count({ where: { status: HouseStatus.PENDING } }),
      this.prisma.order.count(),
      this.prisma.order.count({ where: { status: OrderStatus.PAID } }),
      this.prisma.order.aggregate({
        where: { status: OrderStatus.PAID },
        _sum: { amount: true }
      })
    ]);
    return {
      totalUsers,
      totalHouses,
      pendingHouses,
      totalOrders,
      paidOrders,
      totalAmount: paid._sum.amount || 0
    };
  }

  houses(params: { status?: string; keyword?: string }) {
    return this.prisma.house.findMany({
      where: {
        ...(this.isHouseStatus(params.status) ? { status: params.status } : {}),
        ...(params.keyword
          ? { OR: [{ title: { contains: params.keyword } }, { city: { contains: params.keyword } }] }
          : {})
      },
      include: { host: { select: { id: true, name: true, email: true, role: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  createPlatformHouse(dto: CreateHouseDto) {
    return this.prisma.house.create({
      data: {
        ...dto,
        source: HouseSource.PLATFORM,
        status: HouseStatus.PUBLISHED,
        hostId: null
      }
    });
  }

  updateHouse(id: string, dto: UpdateHouseDto) {
    return this.prisma.house.update({ where: { id }, data: dto });
  }

  updateHouseStatus(id: string, status: string) {
    if (!this.isHouseStatus(status)) {
      throw new BadRequestException('Invalid house status');
    }
    return this.prisma.house.update({ where: { id }, data: { status } });
  }

  async deleteHouse(id: string) {
    const house = await this.prisma.house.findUnique({ where: { id } });
    if (!house) {
      throw new NotFoundException('House not found');
    }
    await this.prisma.$transaction([
      this.prisma.favorite.deleteMany({ where: { houseId: id } }),
      this.prisma.browseHistory.deleteMany({ where: { houseId: id } }),
      this.prisma.order.deleteMany({ where: { houseId: id } }),
      this.prisma.house.delete({ where: { id } })
    ]);
    return { ok: true };
  }

  orders(params: { status?: string; keyword?: string }) {
    return this.prisma.order.findMany({
      where: {
        ...(this.isOrderStatus(params.status) ? { status: params.status } : {}),
        ...(params.keyword ? { orderNo: { contains: params.keyword } } : {})
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        house: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async orderDetail(orderNo: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderNo },
      include: {
        user: { select: { id: true, name: true, email: true } },
        house: true
      }
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  updateOrderStatus(orderNo: string, status: string) {
    if (!this.isOrderStatus(status)) {
      throw new BadRequestException('Invalid order status');
    }
    return this.prisma.order.update({ where: { orderNo }, data: { status } });
  }

  users(params: { role?: string; keyword?: string }) {
    return this.prisma.user.findMany({
      where: {
        ...(this.isUserRole(params.role) ? { role: params.role } : {}),
        ...(params.keyword
          ? { OR: [{ name: { contains: params.keyword } }, { email: { contains: params.keyword } }] }
          : {})
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        _count: { select: { houses: true, orders: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  updateUserStatus(id: string, status: string) {
    if (status !== UserStatus.ACTIVE && status !== UserStatus.DISABLED) {
      throw new BadRequestException('Invalid user status');
    }
    return this.prisma.user.update({
      where: { id },
      data: { status },
      select: { id: true, email: true, name: true, role: true, status: true }
    });
  }

  private isHouseStatus(status?: string): status is HouseStatus {
    return Object.values(HouseStatus).includes(status as HouseStatus);
  }

  private isOrderStatus(status?: string): status is OrderStatus {
    return Object.values(OrderStatus).includes(status as OrderStatus);
  }

  private isUserRole(role?: string): role is UserRole {
    return Object.values(UserRole).includes(role as UserRole);
  }
}
