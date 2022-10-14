export interface Output {
  image_name: string;

  max_pers: number;

  id_image: Image;

  id_trads: Audio;
}

export interface Image {
  hash: string;
  path: string;
  detected: number;
}
export interface Audio {
  input_text: string;
  Trad_fr: string[];
  Trad_en: string[];
}
