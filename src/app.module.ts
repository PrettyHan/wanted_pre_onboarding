import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WantedController } from './wanted/wanted.controller';
import { WantedService } from './wanted/wanted.service';
import { WantedModule } from './wanted/wanted.module';

@Module({
  imports: [WantedModule],
  controllers: [AppController, WantedController],
  providers: [AppService, WantedService],
})
export class AppModule {}
