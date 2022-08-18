import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { companyEntity } from './entity/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([companyEntity])],
  exports: [TypeOrmModule],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
