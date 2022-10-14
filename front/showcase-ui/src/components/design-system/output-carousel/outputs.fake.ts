import { Output } from './output.type';

export const fakeOutputs: Output[] = [
  {
    max_pers: 3,
    image_name: 'test',
    id_image: {
      detected: 2,
      hash: '80ea20c2b2807675e31cd6a6994f03da',
      path: 'http://localhost:9000/api-files/80ea20c2b2807675e31cd6a6994f03da.png',
    },
    id_trads: {
      input_text: "j'ai pas raison la team",
      Trad_fr: ["j'ai pas raison la team", 'audio.wav'],
      Trad_en: ['flemme', 'audio.wav'],
    },
  },
  {
    max_pers: 2,
    image_name: 'lol',
    id_image: {
      detected: 3,
      hash: '80ea20c2b2807675e31cd6a6994f03da',
      path: 'http://localhost:9000/api-files/80ea20c2b2807675e31cd6a6994f03da.png',
    },
    id_trads: {
      input_text: "j'ai pas raison la team",
      Trad_fr: ["j'ai pas raison la team", 'audio.wav'],
      Trad_en: ['flemme', 'audio.wav'],
    },
  },
];
