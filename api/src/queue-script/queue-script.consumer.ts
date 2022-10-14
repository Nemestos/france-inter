import { Process, Processor } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { PythonShell } from 'python-shell';
import { IAzureScriptParams } from './queue-script.types';

@Processor('script')
export class QueueScriptConsumer {
  constructor(private readonly configService: ConfigService) {}
  @Process()
  async launchScript(job: Job<IAzureScriptParams>) {
    console.log('running script with :');
    console.log(job.data);
    const { res, success } = await this.runPythonScript(job.data);
    if (res) {
      console.log('script reussi avec :', res[0]);
    } else {
      console.error('erreur pendant le script', res[0]);
    }
  }

  runPythonScript(
    data: IAzureScriptParams,
  ): Promise<{ success: true; res: any[] }> {
    const args = `--max ${data.maxPers} --text ${data.text} --file ${data.imagePath} --language en`;
    const scriptPath = `${this.configService.get<string>(
      'SCRIPT_FOLDER_PATH',
    )}/${this.configService.get<string>('MAIN_SCRIPT_NAME')}`;
    return new Promise<{ success: true; res: any[] }>((resolve, reject) => {
      PythonShell.run(
        scriptPath,
        {
          args: args.split(' '),
        },
        function (err, res) {
          if (err) {
            console.error(err);
            reject({ success: false, err });
          }

          resolve({ success: true, res });
        },
      );
    });
  }
}
