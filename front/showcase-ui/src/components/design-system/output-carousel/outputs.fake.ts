import { Output } from './output.type';

export const fakeOutputs: Output[] = [
  {
    max_pers: 3,
    image_name: 'test',
    image: {
      detect: 2,
      hash: '80ea20c2b2807675e31cd6a6994f03da',
      path: 'http://localhost:9000/api-files/80ea20c2b2807675e31cd6a6994f03da.png',
    },
    trads: {
      trad_fr: "j'ai pas raison la team",
      trad_en: "I'm not right the team?",
      file_en: 'team.wav',
      file_fr: 'lol',
    },
  },
  {
    max_pers: 2,
    image_name: 'lol',
    image: {
      detect: 3,
      hash: '80ea20c2b2807675e31cd6a6994f03da',
      path: 'http://localhost:9000/api-files/80ea20c2b2807675e31cd6a6994f03da.png',
    },
    trads: {
      trad_fr: 'je veux mourir',
      trad_en: 'I want to die',
      file_en: 'die.wav',
      file_fr: 'mort.wav',
    },
  },
];
