// src/exercise/exercise.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExerciseService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateExerciseDto) {
        const data: any = {
            question: dto.question,
            options: dto.options,
            answer: dto.answer,
            theme: dto.theme,
            authorId: dto.authorId,
            classroomId: dto.classroomId ?? null,
        };
        return this.prisma.exercise.create({
            data,
            include: { author: true, classroom: true, answers: true },
        });
    }

    async findAll() {
        return this.prisma.exercise.findMany({ include: { author: true, classroom: true, answers: true } });
    }

    async findOne(id: string) {
        const ex = await this.prisma.exercise.findUnique({
            where: { id },
            include: { author: true, classroom: true, answers: true },
        });
        if (!ex) throw new NotFoundException('Exercise not found');
        return ex;
    }

    async update(id: string, dto: UpdateExerciseDto) {
        const data: any = { ...dto };
        return this.prisma.exercise.update({
            where: { id },
            data,
            include: { author: true, classroom: true, answers: true },
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.exercise.delete({ where: { id } });
    }
}
