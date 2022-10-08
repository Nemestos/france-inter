import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Output } from './output.schema';
import { TasksService } from './tasks.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio-client/file.model';
import { CreateTaskDto } from './tasks.interface';
import { MinioClientService } from 'src/minio-client/minio-client.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly minioClientService: MinioClientService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createTask(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg|png',
        })
        .build({
          errorHttpStatusCode: HttpStatus.BAD_REQUEST,
          fileIsRequired: true,
        }),
    )
    image: BufferedFile,
    @Body() body: CreateTaskDto,
  ) {
    try {
      this.minioClientService.upload(image);
    } catch (err) {
      throw new HttpException(err, 500);
    }
    const res = this.tasksService.createTask(body);
    if (res) {
      return 'la task a bien été lancé et le fichier upload';
    }
    return 'Problème lors du lancement de la task';
  }

  @Get()
  findAll(): Promise<Output[]> {
    return this.tasksService.findTasks();
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    await this.tasksService.deleteTaskById(id);
    return `La task avec l'id ${id} a bien ete supprimé`;
  }
}
