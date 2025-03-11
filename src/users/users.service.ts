import { Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  //   async createUser(user: User): Promise<User> {
  //     return await this.prismaService.user.create({
  //       data: {
  //         name: user.name,
  //         email: user.email,
  //       },
  //     });
  //   }
}
