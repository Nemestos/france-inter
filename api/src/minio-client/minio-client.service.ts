import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './file.model';
import * as crypto from 'crypto';

@Injectable()
export class MinioClientService {
  constructor(
    private readonly minio: MinioService,
    private readonly config: ConfigService,
  ) {
    this.logger = new Logger('MinioService');
  }

  private logger: Logger;
  private readonly bucketName = this.config.get<string>('MINIO_BUCKET');

  public get client() {
    return this.minio.client;
  }

  public async upload(
    file: BufferedFile,
    bucketName: string = this.bucketName,
  ): Promise<{ url: string }> {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException(
        'File type not supported(png, jpeg)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedFileName = crypto
      .createHash('md5')
      .update(file.originalname)
      .digest('hex');

    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );

    const meta = {
      'Content-Type': file.mimetype,
    };

    const fileName = hashedFileName + ext;

    this.client.putObject(
      bucketName,
      fileName,
      file.buffer,
      meta,
      function (err, res) {
        if (err) {
          throw new HttpException(
            'Error uploading file',
            HttpStatus.BAD_REQUEST,
          );
        }
      },
    );
    return {
      url: fileName,
    };
  }
}
