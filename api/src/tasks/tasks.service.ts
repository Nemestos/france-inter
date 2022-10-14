import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueueScriptService } from 'src/queue-script/queue-script.service';
import { IAzureScriptParams } from 'src/queue-script/queue-script.types';
import { Image } from './image.schema';
import { Output, OutputDocument } from './output.schema';
import { CreateTaskDto } from './tasks.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Output.name) private outputModel: Model<OutputDocument>,
    private readonly queueScriptService: QueueScriptService,
  ) {}

  async createTask(
    createTaskDto: CreateTaskDto,
    url: string,
  ): Promise<boolean> {
    const params: IAzureScriptParams = {
      imagePath: url,
      maxPers: createTaskDto.maxPersons,
      text: createTaskDto.text,
    };
    const job = await this.queueScriptService.launchScript(params);
    return job != null;
  }

  async findTasks(): Promise<Output[]> {
    return this.outputModel
      .find()
      .populate('id_image')
      .populate('id_trads')
      .exec();
  }
  async deleteTaskById(id: string) {
    try {
      await this.outputModel.deleteOne({
        _id: id,
      });
    } catch (err) {
      throw new HttpException(
        `impossible de supprimer la task avec l'id ${id}`,
        400,
      );
    }
  }
}
