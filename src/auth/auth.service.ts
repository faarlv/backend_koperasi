import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/password.util';

export type AuthInput = { name: string; password: string };
export type SignInData = { id: string; name: string };
export type AuthOutput = { id: string; name: string; token: string };

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.getUserByName(input.name);
    if (user != null) {
      console.log(user.password);
      console.log(input.password);
      const jwt = env.JWT_SECRET;
      console.log(jwt);
      const isValid = await comparePassword(input.password, user.password);
      if (!isValid) {
        throw new UnauthorizedException('invalid password');
      }
      return { id: user.id, name: user.name };
    }
    throw new UnauthorizedException();
  }

  async login(input: SignInData): Promise<AuthOutput | null> {
    console.log(
      'JWT Secret in AuthService:',
      this.jwtService['secretOrPrivateKey'],
    );
    const userPayload = { name: input.name, sub: input.id };
    const token = await this.jwtService.signAsync(userPayload);
    return {
      id: input.id,
      name: input.name,
      token: token,
    };
  }

  async authenticateUser(input: AuthInput): Promise<AuthOutput | null> {
    const user = await this.validateUser(input);
    if (user != null) {
      return this.login(user);
    }
    throw new UnauthorizedException();
  }
}
