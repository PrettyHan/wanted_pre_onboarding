import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { wantedEntity } from './entity/wanted.entity';
import { WantedController } from './wanted.controller';
import { WantedService } from './wanted.service';

@Module({
  imports: [TypeOrmModule.forFeature([wantedEntity])],
  exports: [TypeOrmModule],
  providers: [WantedService],
  controllers: [WantedController],
})
export class WantedModule {}
