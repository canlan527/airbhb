import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole, UserStatus } from '@prisma/client';
import { compareSync, hashSync } from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) {
      throw new BadRequestException('Email already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashSync(dto.password, 10),
        role: UserRole.USER
      }
    });

    return this.sign(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (user.status === UserStatus.DISABLED) {
      throw new UnauthorizedException('Account disabled');
    }
    return this.sign(user);
  }

  async profile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, avatar: true, role: true, status: true, createdAt: true }
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  private sign(user: { id: string; email: string; role: UserRole; name: string }) {
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role
    });
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }
}
