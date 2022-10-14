export interface Output {
  image_name: string;

  max_pers: number;

  image: Image;

  trads: Audio;
}

export interface Image {
  hash: string;
  path: string;
  detect: number;
}
export interface Audio {
  trad_fr: string;
  trad_en: string;

  file_fr: string;
  file_en: string;
}
