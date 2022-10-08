import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueScriptConsumer } from './queue-script.consumer';
import { QueueScriptService } from './queue-script.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
        defaultJobOptions: {
          removeOnComplete: false,
          removeOnFail: false,
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'script',
    }),
  ],
  providers: [QueueScriptService, QueueScriptConsumer],
  exports: [QueueScriptService],
})
export class QueueScriptModule {}
