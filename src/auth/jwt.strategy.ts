import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import config from '../config/configuration';
import { User } from '../users/user.entity';
import { JwtPayload } from './jwtpayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.auth.secretKey,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await User.findOne(payload.id);

    if (!user) {
      throw new UnauthorizedException('No such user');
    }

    return user;
  }
}
