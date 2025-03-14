import {
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('signin')
  @UseGuards(LocalGuard)
  async signIn(@Request() request) {
    const tokentest = await this.authService.login(request.user);
    console.log('User from request:', tokentest);
    return await this.authService.login(request.user);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async me(@Request() request) {
    return await request.user;
  }
}
