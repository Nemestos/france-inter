import { JobStatus } from 'bull';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { OutputDocument } from './output.schema';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumberString()
  @IsNotEmpty()
  maxPersons: number;
}

export interface GetTaskDto {
  data: OutputDocument;
  status: JobStatus;
}
