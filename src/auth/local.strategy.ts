import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./tpyes/login.types";


// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly authService: AuthService) {
//     super();
//   }

//   async validate(data: LoginDTO): Promise<any> {
//     const user = await this.authService.loginUser(data);

//     if(!user) {
//       throw new UnauthorizedException();
//     }

//     return user;
//   }
// }

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);

    if(!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}