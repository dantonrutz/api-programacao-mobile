import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatchUserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async createUser(dto: PatchUserDTO) {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        image: dto.image, 
      },
    });

    return user;
  }
}
