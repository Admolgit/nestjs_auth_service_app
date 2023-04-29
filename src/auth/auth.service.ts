import { Inject, Injectable, Logger, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError, timeout, TimeoutError } from 'rxjs';
import { compareSync } from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly client: ClientProxy,
    private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.client.send({ role: 'user', cmd: 'get' }, { username })
      .pipe(
        timeout(5000), 
        catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),)
      .toPromise();

      if(compareSync(password, user?.password)) {
        return user;
      }

      return null;
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }

  async login(user: any) {
    const payload = { user, sub: user.id};

    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload)
    };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}