import { IsDateString, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  houseId!: string;

  @IsDateString()
  checkIn!: string;

  @IsDateString()
  checkOut!: string;
}

export class UpdateOrderStatusDto {
  @IsString()
  status!: string;
}
