import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WantedController } from './wanted/wanted.controller';
import { WantedService } from './wanted/wanted.service';
import { WantedModule } from './wanted/wanted.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { wantedEntity } from './wanted/entity/wanted.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: 'test',
      entities: [wantedEntity],
      synchronize: true,
    }),
    WantedModule,
  ],
  controllers: [AppController, WantedController],
  providers: [AppService, WantedService],
})
export class AppModule {}
