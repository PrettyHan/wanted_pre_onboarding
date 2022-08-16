import { IsNotEmpty } from 'class-validator';

export class CreateWantedDto {
  @IsNotEmpty()
  readonly position: string;
  @IsNotEmpty()
  readonly reward: number;
  @IsNotEmpty()
  readonly content: string;
  @IsNotEmpty()
  readonly skill: string;
}
