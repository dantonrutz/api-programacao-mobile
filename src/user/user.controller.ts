import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/auth/decorator';
import { User } from 'generated/prisma';

@ApiBearerAuth('swagger')
@UseGuards(JwtGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('partial-profile')
  @Roles('ADMIN','COORDINATOR', 'TEACHER', 'STUDENT')
  getUserPartialProfile(@GetUser() user: User) {
    return this.userService.getUserPartialProfile(user)
  }

  @Get('rota-de-admin')
  @Roles('ADMIN')
  onlyCoordinator(@GetUser() user: User) {
    return { msg: 'Você é um administrador', role: user.roles }
  }
}