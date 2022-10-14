import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { IAzureScriptParams } from './queue-script.types';

@Injectable()
export class QueueScriptService {
  constructor(
    @InjectQueue('script') private scriptQueue: Queue<IAzureScriptParams>,
  ) {}

  async launchScript(
    params: IAzureScriptParams,
  ): Promise<Job<IAzureScriptParams>> {
    const job = await this.scriptQueue.add({
      ...params,
    });
    return job;
  }
  async getAllJobs(): Promise<Job[]> {
    const jobs = await this.scriptQueue.getJobs([
      'active',
      'completed',
      'delayed',
      'failed',
      'paused',
      'waiting',
    ]);
    return jobs;
  }
}
