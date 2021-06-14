export interface Sketch {
  url: string;
  name: string;
  dark: boolean;
  code: string;
  date: Date;
  description: string;
}

export const sketches: Sketch[] = [
  {
    url: "https://editor.p5js.org/maayan/present/ukeGuqRv-",
    name: "matisse",
    dark: false,
    code: "https://editor.p5js.org/maayan/sketches/yIzR-Ye-Y",
    date: new Date(2021, 5, 13),
    description: "i'm a matisse knock off",
  },
  {
    url: "https://editor.p5js.org/maayan/present/Vg-LukoEb",
    name: "triangle-thingy",
    dark: true,
    code: "https://editor.p5js.org/maayan/sketches/X95eHHiuX",
    date: new Date(2021, 5, 11),
    description: "3D graphics are overrated",
  },
  {
    url: "https://editor.p5js.org/maayan/present/9BqHehQCh",
    name: "plastic-particles",
    dark: true,
    code: "https://editor.p5js.org/maayan/sketches/0jlzjY8ds",
    date: new Date(2021, 5, 11),
    description: "plastic like the particles in our blood",
  },
  {
    url: "https://editor.p5js.org/maayan/present/jnJ_fII_O",
    name: "minnows",
    dark: false,
    code: "https://editor.p5js.org/maayan/sketches/yLhu1mf8G",
    date: new Date(2021, 5, 3),
    description: "minnows eat their young",
  },
  {
    url: "https://editor.p5js.org/maayan/present/TlN-_jf79",
    name: "smiley",
    code: "https://editor.p5js.org/maayan/sketches/hCqCgbSOg",
    dark: true,
    date: new Date(2021, 4, 3),
    description: "are you sad inside too?",
  },
];
