import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { CurrentUser, RequestUser } from '../../common/current-user.decorator';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { HistoriesService } from './histories.service';

@Controller('me/histories')
@UseGuards(JwtAuthGuard)
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Get()
  list(@CurrentUser() user: RequestUser) {
    return this.historiesService.list(user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: RequestUser) {
    return this.historiesService.remove(id, user.id);
  }
}
