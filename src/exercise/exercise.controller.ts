import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly service: ExerciseService) { }

  @Post()
  @Roles('ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT')
  create(@Body() dto: CreateExerciseDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateExerciseDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
