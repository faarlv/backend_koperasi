import { Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/utils/password.util';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(user: User): Promise<User> {
    const hashedPassword = await hashPassword(user.password);

    return await this.prismaService.user.create({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: hashedPassword,
      },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async updateUser(id: number, data: User): Promise<User> {
    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    });
  }

  async deleteUser(id: number): Promise<User> {
    return await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
