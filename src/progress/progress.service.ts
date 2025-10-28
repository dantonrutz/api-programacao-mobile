import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateProgressDto) {
        return this.prisma.progress.create({ data: { xp: dto.xp ?? 0, streak: dto.streak ?? 0, userId: dto.userId }, include: { user: true } });
    }

    async findAll() { return this.prisma.progress.findMany({ include: { user: true } }); }

    async findOne(id: number) {
        const p = await this.prisma.progress.findUnique({ where: { id }, include: { user: true } });
        if (!p) throw new NotFoundException('Progress not found');
        return p;
    }

    async update(id: number, dto: UpdateProgressDto) {
        return this.prisma.progress.update({ where: { id }, data: dto, include: { user: true } });
    }

    async remove(id: number) {
        await this.findOne(id);
        return this.prisma.progress.delete({ where: { id } });
    }
}
