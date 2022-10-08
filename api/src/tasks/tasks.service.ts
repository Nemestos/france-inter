import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Output, OutputDocument } from './output.schema';
import { CreateTaskDto } from './tasks.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Output.name) private outputModel: Model<OutputDocument>,
  ) {}

  createTask(createTaskDto: CreateTaskDto): boolean {
    return true;
  }

  findTasks(): Promise<Output[]> {
    return this.outputModel.find().exec();
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
