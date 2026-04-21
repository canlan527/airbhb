import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser, RequestUser } from '../../common/current-user.decorator';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { CreateOrderDto } from './dto';
import { OrdersService } from './orders.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('me/orders')
  myOrders(@CurrentUser() user: RequestUser) {
    return this.ordersService.myOrders(user.id);
  }

  @Post('orders')
  create(@Body() dto: CreateOrderDto, @CurrentUser() user: RequestUser) {
    return this.ordersService.create(dto, user.id);
  }

  @Get('orders/:orderNo')
  detail(@Param('orderNo') orderNo: string, @CurrentUser() user: RequestUser) {
    return this.ordersService.detail(orderNo, user.id);
  }

  @Patch('orders/:orderNo/pay')
  pay(@Param('orderNo') orderNo: string, @CurrentUser() user: RequestUser) {
    return this.ordersService.pay(orderNo, user.id);
  }

  @Patch('orders/:orderNo/cancel')
  cancel(@Param('orderNo') orderNo: string, @CurrentUser() user: RequestUser) {
    return this.ordersService.cancel(orderNo, user.id);
  }
}
