import { plainToInstance } from 'class-transformer';
import { IsNumber, validateSync } from 'class-validator';

class EnvVars {
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
