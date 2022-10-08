import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumberString()
  @IsNotEmpty()
  maxPersons: number;
}
