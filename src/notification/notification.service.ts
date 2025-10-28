import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateNotificationDto) {
        return this.prisma.notification.create({ data: dto, include: { user: true } });
    }

    async findAll() { return this.prisma.notification.findMany({ include: { user: true } }); }

    async findOne(id: number) {
        const n = await this.prisma.notification.findUnique({ where: { id }, include: { user: true } });
        if (!n) throw new NotFoundException('Notification not found');
        return n;
    }

    async update(id: number, dto: UpdateNotificationDto) {
        return this.prisma.notification.update({ where: { id }, data: dto, include: { user: true } });
    }

    async remove(id: number) {
        await this.findOne(id);
        return this.prisma.notification.delete({ where: { id } });
    }
}
