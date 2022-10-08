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
      const { url } = await this.minioClientService.upload(image);
      const res = await this.tasksService.createTask(body, url);
      if (res) {
        return 'la task a bien été lancé et le fichier upload';
      }
      return 'Problème lors du lancement de la task';
    } catch (err) {
      throw new HttpException(err, 500);
    }
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
