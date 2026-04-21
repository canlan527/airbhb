import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser, RequestUser } from '../../common/current-user.decorator';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { FavoritesService } from './favorites.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('me/favorites')
  list(@CurrentUser() user: RequestUser) {
    return this.favoritesService.list(user.id);
  }

  @Post('houses/:id/favorite')
  add(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.favoritesService.add(id, user.id);
  }

  @Delete('houses/:id/favorite')
  remove(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.favoritesService.remove(id, user.id);
  }
}
