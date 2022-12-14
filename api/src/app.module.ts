import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { QueueScriptModule } from './queue-script/queue-script.module';
import validate from './utils/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const host = config.get('MONGODB_HOST');
        const port = config.get('MONGODB_PORT');
        const db = config.get('MONGODB_DB');
        return {
          uri: `mongodb://${host}:${port}/${db}`,
        };
      },
    }),
    TasksModule,
    MinioClientModule,
    QueueScriptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
