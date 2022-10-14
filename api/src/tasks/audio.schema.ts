import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AudioDocument = Audio & Document;

@Schema()
export class Audio {
  @Prop()
  input_txt: string;
  @Prop()
  Trad_fr: Array<string>;

  @Prop()
  Trad_en: Array<string>;
}

export const AudioSchema = SchemaFactory.createForClass(Audio);
