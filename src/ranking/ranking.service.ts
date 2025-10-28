import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';

@Injectable()
export class RankingService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateRankingDto) {
        return this.prisma.ranking.create({ data: dto, include: { classroom: true, user: true } });
    }

    async findAll() { return this.prisma.ranking.findMany({ include: { classroom: true, user: true } }); }

    async findOne(id: number) {
        const r = await this.prisma.ranking.findUnique({ where: { id }, include: { classroom: true, user: true } });
        if (!r) throw new NotFoundException('Ranking not found');
        return r;
    }

    async update(id: number, dto: UpdateRankingDto) {
        return this.prisma.ranking.update({ where: { id }, data: dto, include: { classroom: true, user: true } });
    }

    async remove(id: number) {
        await this.findOne(id);
        return this.prisma.ranking.delete({ where: { id } });
    }
}
