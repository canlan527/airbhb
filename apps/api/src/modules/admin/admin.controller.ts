import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { RolesGuard } from '../../common/roles.guard';
import { CreateHouseDto, UpdateHouseDto, UpdateHouseStatusDto } from '../houses/dto';
import { UpdateOrderStatusDto } from '../orders/dto';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, new RolesGuard(['ADMIN']))
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  dashboard() {
    return this.adminService.dashboard();
  }

  @Get('houses')
  houses(@Query('status') status?: string, @Query('keyword') keyword?: string) {
    return this.adminService.houses({ status, keyword });
  }

  @Post('houses')
  createPlatformHouse(@Body() dto: CreateHouseDto) {
    return this.adminService.createPlatformHouse(dto);
  }

  @Patch('houses/:id')
  updateHouse(@Param('id') id: string, @Body() dto: UpdateHouseDto) {
    return this.adminService.updateHouse(id, dto);
  }

  @Patch('houses/:id/status')
  updateHouseStatus(@Param('id') id: string, @Body() dto: UpdateHouseStatusDto) {
    return this.adminService.updateHouseStatus(id, dto.status);
  }

  @Delete('houses/:id')
  deleteHouse(@Param('id') id: string) {
    return this.adminService.deleteHouse(id);
  }

  @Get('orders')
  orders(@Query('status') status?: string, @Query('keyword') keyword?: string) {
    return this.adminService.orders({ status, keyword });
  }

  @Get('orders/:orderNo')
  orderDetail(@Param('orderNo') orderNo: string) {
    return this.adminService.orderDetail(orderNo);
  }

  @Patch('orders/:orderNo/status')
  updateOrderStatus(@Param('orderNo') orderNo: string, @Body() dto: UpdateOrderStatusDto) {
    return this.adminService.updateOrderStatus(orderNo, dto.status);
  }

  @Get('users')
  users(@Query('role') role?: string, @Query('keyword') keyword?: string) {
    return this.adminService.users({ role, keyword });
  }

  @Patch('users/:id/status')
  updateUserStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.adminService.updateUserStatus(id, status);
  }
}
