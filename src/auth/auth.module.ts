import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthService, AuthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
