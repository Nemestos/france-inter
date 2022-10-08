import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { IAzureScriptParams } from './queue-script.types';

@Processor('script')
export class QueueScriptConsumer {
  @Process()
  async launchScript(job: Job<IAzureScriptParams>) {
    console.log('running script with :');
    console.log(job.data);
  }
}
