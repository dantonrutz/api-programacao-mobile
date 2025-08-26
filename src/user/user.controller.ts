import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { PatchUserDTO } from './dto';
import { User } from 'generated/prisma';

@Controller('usuarios')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('listar')
  getUsers() {
    return this.userService.getUsers();
  }

  @Post('criar')
  createUser(@Body() dto: PatchUserDTO) {
    return this.userService.createUser(dto);
  }
}