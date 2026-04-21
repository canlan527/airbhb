import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  myOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { house: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(dto: CreateOrderDto, userId: string) {
    const house = await this.prisma.house.findUnique({ where: { id: dto.houseId } });
    if (!house) {
      throw new NotFoundException('House not found');
    }
    const checkIn = new Date(dto.checkIn);
    const checkOut = new Date(dto.checkOut);
    const nights = Math.max(Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86400000), 1);
    const orderNo = `STAY${Date.now()}${Math.floor(Math.random() * 1000)}`;
    return this.prisma.order.create({
      data: {
        orderNo,
        userId,
        houseId: house.id,
        checkIn,
        checkOut,
        nights,
        amount: nights * house.price
      },
      include: { house: true }
    });
  }

  async detail(orderNo: string, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { orderNo },
      include: { house: true }
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.userId !== userId) {
      throw new ForbiddenException('You can only view your own orders');
    }
    return order;
  }

  async pay(orderNo: string, userId: string) {
    await this.detail(orderNo, userId);
    return this.prisma.order.update({
      where: { orderNo },
      data: { status: OrderStatus.PAID },
      include: { house: true }
    });
  }

  async cancel(orderNo: string, userId: string) {
    await this.detail(orderNo, userId);
    return this.prisma.order.update({
      where: { orderNo },
      data: { status: OrderStatus.CANCELLED },
      include: { house: true }
    });
  }
}
