import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { applicationEntity } from './entity/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([applicationEntity])],
  exports: [TypeOrmModule],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
