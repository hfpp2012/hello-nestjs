import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import config from '../config/configuration';

@Module({
  imports: [
    JwtModule.register({
      secret: config.auth.secretKey,
    }),
  ],
  providers: [JwtStrategy],
  exports: [],
})
export class AuthModule {}
