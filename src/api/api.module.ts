import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Api} from './api.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Api])],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
