import { HouseStatus } from '@prisma/client';
import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateHouseDto {
  @IsString()
  title!: string;

  @IsString()
  city!: string;

  @IsString()
  address!: string;

  @IsInt()
  @Min(1)
  price!: number;

  @IsString()
  coverUrl!: string;

  @IsArray()
  @IsString({ each: true })
  imageUrls!: string[];

  @IsArray()
  @IsString({ each: true })
  tags!: string[];

  @IsString()
  description!: string;

  @IsInt()
  @Min(1)
  bedrooms!: number;

  @IsInt()
  @Min(1)
  bathrooms!: number;
}

export class UpdateHouseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  price?: number;

  @IsOptional()
  @IsString()
  coverUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  bedrooms?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  bathrooms?: number;
}

export class UpdateHouseStatusDto {
  @IsString()
  status!: HouseStatus;
}
