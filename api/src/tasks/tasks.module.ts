import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { Audio, AudioSchema } from './audio.schema';
import { Image, ImageSchema } from './image.schema';
import { Output, OutputSchema } from './output.schema';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Output.name,
        schema: OutputSchema,
      },
      {
        name: Image.name,
        schema: ImageSchema,
      },
      {
        name: Audio.name,
        schema: AudioSchema,
      },
    ]),
    MinioClientModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
