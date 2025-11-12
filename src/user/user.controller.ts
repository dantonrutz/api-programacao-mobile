import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/auth/decorator';
import { User } from 'generated/prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth('swagger')
@UseGuards(JwtGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('me')
  @Roles('ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT')
  getUserProfile(@GetUser() user: User) {
    return this.userService.getUserProfile(user)
  }

  @Get('rota-de-admin')
  @Roles('ADMIN')
  onlyCoordinator(@GetUser() user: User) {
    return { msg: 'Você é um administrador', role: user.roles }
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
