import { Module } from '@nestjs/common';
import { MockService } from './mock.service';
import { MockController } from './mock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mock } from './mock.entity';
import { ApiModule } from 'src/api/api.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mock]), ApiModule],
  providers: [MockService],
  controllers: [MockController]
})
export class MockModule {}
