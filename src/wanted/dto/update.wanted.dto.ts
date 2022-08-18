import { PartialType } from '@nestjs/swagger';
import { CreateWantedDto } from './create.wanted.dto';

export class UpdateWantedDto extends PartialType(CreateWantedDto) {}
