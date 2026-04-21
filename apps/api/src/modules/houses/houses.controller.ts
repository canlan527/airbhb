import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser, RequestUser } from '../../common/current-user.decorator';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { CreateHouseDto, UpdateHouseDto } from './dto';
import { HousesService } from './houses.service';

@Controller()
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Get('houses')
  list(@Query('city') city?: string, @Query('page') page = '1', @Query('pageSize') pageSize = '20') {
    return this.housesService.publicList({ city, page: Number(page), pageSize: Number(pageSize) });
  }

  @Get('houses/:id')
  detail(@Param('id') id: string) {
    return this.housesService.publicDetail(id);
  }

  @Post('houses/:id/view')
  @UseGuards(JwtAuthGuard)
  recordView(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.housesService.recordView(id, user.id);
  }

  @Get('me/houses')
  @UseGuards(JwtAuthGuard)
  myHouses(@CurrentUser() user: RequestUser) {
    return this.housesService.myHouses(user.id);
  }

  @Post('me/houses')
  @UseGuards(JwtAuthGuard)
  createMyHouse(@Body() dto: CreateHouseDto, @CurrentUser() user: RequestUser) {
    return this.housesService.createUserHouse(dto, user.id);
  }

  @Patch('me/houses/:id')
  @UseGuards(JwtAuthGuard)
  updateMyHouse(@Param('id') id: string, @Body() dto: UpdateHouseDto, @CurrentUser() user: RequestUser) {
    return this.housesService.updateUserHouse(id, dto, user.id);
  }

  @Delete('me/houses/:id')
  @UseGuards(JwtAuthGuard)
  deleteMyHouse(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.housesService.deleteUserHouse(id, user.id);
  }

  @Get('home/goodprice')
  legacyGoodPrice() {
    return this.housesService.legacySection('高性价比房源', { take: 8 });
  }

  @Get('home/highscore')
  legacyHighScore() {
    return this.housesService.legacySection('高分好评房源', { take: 8, orderBy: 'rating' });
  }

  @Get('home/discount')
  legacyDiscount() {
    return this.housesService.legacySection('热门城市房源', { take: 12, groupByCity: true });
  }

  @Get('home/hotrecommenddest')
  legacyRecommend() {
    return this.housesService.legacySection('热门目的地', { take: 12, groupByCity: true });
  }

  @Get('home/longfor')
  legacyLongFor() {
    return this.housesService.legacyLongFor();
  }

  @Get('home/plus')
  legacyPlus() {
    return this.housesService.legacySection('平台精选 Plus 房源', { take: 8 });
  }

  @Get('entire/list')
  legacyEntire(@Query('offset') offset = '0', @Query('size') size = '20') {
    return this.housesService.legacyEntire(Number(offset), Number(size));
  }
}
