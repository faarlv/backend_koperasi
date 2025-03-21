import { Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/utils/password.util';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(user: User): Promise<User> {
    const userData: any = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
    };

    // Conditionally add the role if it exists
    if (user.role) {
      userData.role = user.role;
    }

    return await this.prismaService.user.create({
      data: userData,
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getUserByName(name: string): Promise<User | null> {
    return await this.prismaService.user.findFirst({
      where: {
        name: name,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    const result: User[] = await this.prismaService.user.findMany();
    return result;
  }

  async updateUser(id: string, data: User): Promise<User> {
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

  async deleteUser(id: string): Promise<User> {
    return await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
