import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('notification')
export class NotificationController {
  constructor(private readonly service: NotificationService) { }

  @Post()
  @Roles('ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT')
  create(@Body() dto: CreateNotificationDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @Roles('ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT')
  update(@Param('id') id: string, @Body() dto: UpdateNotificationDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
