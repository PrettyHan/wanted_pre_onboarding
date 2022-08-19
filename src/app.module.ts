import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WantedController } from './wanted/wanted.controller';
import { WantedService } from './wanted/wanted.service';
import { WantedModule } from './wanted/wanted.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { wantedEntity } from './wanted/entity/wanted.entity';
import { CompanyModule } from './company/company.module';
import { companyEntity } from './company/entity/company.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'clfflgksktk',
      database: 'wanted',
      entities: [wantedEntity, companyEntity],
      synchronize: true,
    }),
    WantedModule,
    CompanyModule,
    UserModule,
  ],
  controllers: [AppController, WantedController, UserController],
  providers: [AppService, WantedService, UserService],
})
export class AppModule {}
