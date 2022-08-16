import { IsNotEmpty } from 'class-validator';

export class CreateWantedDto {
  @IsNotEmpty()
  readonly position: string;

  readonly reward: number;

  readonly content: string;

  readonly skill: string;
}
