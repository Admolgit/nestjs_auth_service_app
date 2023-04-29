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

// @Controller('auth')
// export class AuthController {
//   constructor(
//     private authService: AuthService,
//     @Inject('AUTH_SERVICE') private readonly client: ClientProxy,
//   ) {}

//   @Post('/register')
//   registerUser(
//     @Body() registerDTO: RegisterDTO,
//   ): Promise<{ user: RegisterDTO }> {
//     try {
//       return this.authService.registerUser(registerDTO);
//     } catch (error) {
//       return Promise.reject(error.message || error);
//     }
//   }

//   // @UseGuards(LocalAuthGuard)
//   @Post('/login')
//   loginUser(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
//     try {
//       const userToken = this.authService.loginUser(loginDTO);
//       // userToken.then(data => {
//       //   console.log(data);
//       //   this.client.emit('login', data);
//       // });
//       // this.client.emit('login', plainToken);
//       return userToken;
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   }

//   @MessagePattern({ role: 'auth', cmd: 'check'})
//   async loggedIn(data: { jwt: string; }) {
//     try {
//       const res = this.authService.validateToken(data.jwt);

//       return res;
//     } catch(e) {
//       Logger.log(e);
//       return false;
//     }
//   }
// }

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Request() req: Request) {
    return this.authService.login(req.body);
  }

  @MessagePattern({ role: 'auth', cmd: 'check' })
  async loggedIn(data: { jwt: string }) {
    try {
      const res = this.authService.validateToken(data.jwt);

      return res;
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}
