import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ExtractJwt } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'yoursecret'
    });
  }

  async validate(payload: { sub: any; user: any; }) {
    return { id: payload.sub, user: payload.user};
  }
}