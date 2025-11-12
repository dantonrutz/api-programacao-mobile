import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { GetUser, Roles } from 'src/auth/decorator';
import { User } from '@prisma/client';

@ApiBearerAuth('swagger')
@UseGuards(JwtGuard, RolesGuard)
@Controller('classroom')
export class ClassroomController {
  constructor(private classroomService: ClassroomService) { }

  @Get('me')
  @Roles('STUDENT')
  getUserClassroom(@GetUser() user: User) {
    return this.classroomService.getUserClassroom(user)
  }

  @Post()
  create(@Body() dto: CreateClassroomDto) {
    return this.classroomService.create(dto);
  }

  @Get()
  findAll() {
    return this.classroomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classroomService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClassroomDto) {
    return this.classroomService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomService.remove(id);
  }
}
