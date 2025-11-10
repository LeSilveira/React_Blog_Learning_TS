import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: '85hb41d4hfg18hgfd4184bhgf1854gfbhd', // Only for dev, should be in .env
      signOptions: { expiresIn: '60s' }, // Pretty small window intended for testing
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
