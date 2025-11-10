import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateAnswerDto) {
        return this.prisma.answer.create({
            data: {
                selected: dto.selected,
                correct: dto.correct,
                userId: dto.userId,
                exerciseId: dto.exerciseId,
            },
            include: { user: true, exercise: true },
        });
    }

    async findAll() {
        return this.prisma.answer.findMany({ include: { user: true, exercise: true } });
    }

    async findOne(id: string) {
        const a = await this.prisma.answer.findUnique({ where: { id }, include: { user: true, exercise: true } });
        if (!a) throw new NotFoundException('Answer not found');
        return a;
    }

    async update(id: string, dto: UpdateAnswerDto) {
        return this.prisma.answer.update({ where: { id }, data: dto, include: { user: true, exercise: true } });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.answer.delete({ where: { id } });
    }
}
