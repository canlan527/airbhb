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
    return this.housesService.legacySection('佛山高性价比房源', { take: 10, section: 'goodprice', subtitle: '品质房源，低至 5 折' });
  }

  @Get('home/highscore')
  legacyHighScore() {
    return this.housesService.legacySection('高分好评房源', { take: 10, section: 'highscore', orderBy: 'rating', subtitle: '住客真实评分精选' });
  }

  @Get('home/discount')
  legacyDiscount() {
    return this.housesService.legacySection('热门目的地', { take: 36, section: 'discount', groupByCity: true, subtitle: '品质房源，低至 5 折' });
  }

  @Get('home/hotrecommenddest')
  legacyRecommend() {
    return this.housesService.legacySection('探索佛山的精彩之地', {
      take: 48,
      section: 'hotrecommenddest',
      groupByCity: true,
      subtitle: '精选目的地与热门住宿'
    });
  }

  @Get('home/longfor')
  legacyLongFor() {
    return this.housesService.legacyLongFor();
  }

  @Get('home/plus')
  legacyPlus() {
    return this.housesService.legacySection('佛山的爱彼迎 Plus 房源', { take: 8, section: 'plus', subtitle: '品质和设计经过验证的精选房源' });
  }

  @Get('entire/list')
  legacyEntire(@Query('offset') offset = '0', @Query('size') size = '20') {
    return this.housesService.legacyEntire(Number(offset), Number(size));
  }
}
