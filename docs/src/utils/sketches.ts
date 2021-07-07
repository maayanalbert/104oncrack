export interface Sketch {
  url: string;
  name: string;
  dark: boolean;
  code: string;
  date: Date;
  description: string;
  soundtrack: Soundtrack;
}

export interface Soundtrack {
  audioFile: string;
  imgFile: string;
  artist: string;
  trackName: string;
}

const defaultSoundtrack = {
  artist: "thank u for ur patience :)",
  imgFile: "jank.jpeg",
  trackName: "sry i'm still picking a song for this",
  audioFile: "",
};

export const sketches: Sketch[] = [
  {
    url: "https://editor.p5js.org/maayan/present/QjuUJoSVs",
    name: "sheet",
    dark: false,
    code: "https://editor.p5js.org/maayan/sketches/XJrEkQGnX",
    date: new Date(2021, 7, 6),
    description: "shake for a surprise",
    soundtrack: {
      imgFile: "body.png",
      artist: "Megan Thee Stallion",
      trackName: "Body",
      audioFile: "body.mp3",
    },
  },
  {
    url: "https://editor.p5js.org/maayan/present/ukeGuqRv-",
    name: "matisse",
    dark: false,
    code: "https://editor.p5js.org/maayan/sketches/yIzR-Ye-Y",
    date: new Date(2021, 5, 13),
    description: "i'm a matisse knock off",
    soundtrack: defaultSoundtrack,
  },
  {
    url: "https://editor.p5js.org/maayan/present/Vg-LukoEb",
    name: "triangle-thingy",
    dark: true,
    code: "https://editor.p5js.org/maayan/sketches/X95eHHiuX",
    date: new Date(2021, 5, 11),
    description: "3D graphics are overrated",
    soundtrack: {
      imgFile: "loonatic.jpeg",
      artist: "LOONA / ODD EYE CIRLCE",
      trackName: "LOONATIC",
      audioFile: "loonatic.mp3",
    },
  },
  {
    url: "https://editor.p5js.org/maayan/present/9BqHehQCh",
    name: "plastic-particles",
    dark: true,
    code: "https://editor.p5js.org/maayan/sketches/0jlzjY8ds",
    date: new Date(2021, 5, 11),
    description: "plastic like the particles in our blood",
    soundtrack: {
      imgFile: "sanctuary.png",
      artist: "Joji",
      trackName: "Sanctuary",
      audioFile: "sanctuary.mp3",
    },
  },
  {
    url: "https://editor.p5js.org/maayan/present/jnJ_fII_O",
    name: "minnows",
    dark: false,
    code: "https://editor.p5js.org/maayan/sketches/yLhu1mf8G",
    date: new Date(2021, 5, 3),
    description: "minnows eat their young",
    soundtrack: {
      imgFile: "omomo.jpg",
      artist: "Warren Hue",
      trackName: "omomo punk",
      audioFile: "omomo.mp3",
    },
  },
  {
    url: "https://editor.p5js.org/maayan/present/TlN-_jf79",
    name: "smiley",
    code: "https://editor.p5js.org/maayan/sketches/hCqCgbSOg",
    dark: true,
    date: new Date(2021, 4, 3),
    description: "are you sad inside too?",
    soundtrack: {
      imgFile: "lonely.jpeg",
      artist: "Akon",
      trackName: "Lonely",
      audioFile: "lonely.mp3",
    },
  },
];
