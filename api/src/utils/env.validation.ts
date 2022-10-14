import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvVars {
  @IsString()
  MINIO_HOST: string;

  @IsNumber()
  MINIO_PORT: number;

  @IsString()
  MINIO_ACCESS: string;

  @IsString()
  MINIO_SECRET: string;

  @IsString()
  MINIO_BUCKET: string;

  @IsString()
  MONGODB_HOST: string;

  @IsString()
  MONGODB_PORT: string;

  @IsString()
  MONGODB_DB: string;

  @IsString()
  REDIS_HOST: string;

  @IsNumber()
  REDIS_PORT: number;

  @IsNumber()
  API_PORT: number;
}

export default function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvVars, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
