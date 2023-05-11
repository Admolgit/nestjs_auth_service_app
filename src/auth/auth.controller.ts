import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './tpyes/register.types';
import { LoginDTO } from './tpyes/login.types';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from './models/user.models.schema';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService,
    ) {}

  // @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Request() req: Request) {
    return this.authService.login(req.body);
  }

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async loggedIn(data: { jwt: string }) {
    console.log(data, "DATA")
    try {
      const res = this.authService.validateToken(data.jwt);

      return res;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}
