import { IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  text: string;

  @IsNumber()
  maxPersons: number;
}
