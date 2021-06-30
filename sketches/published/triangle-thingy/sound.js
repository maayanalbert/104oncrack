var sound = new Howl({
  src: ["LOONATIC.mp3"],
});

let fadeTimeout;
let soundId;
let soundIsPlaying = false;
let springSystemWasMoving = false;

function updateSound(springSystemIsMoving) {
  if (springSystemIsMoving && !springSystemWasMoving) {
    clearTimeout(fadeTimeout);
    if (!soundIsPlaying) {
      soundIsPlaying = true;
      sound.volume(1);
      if (!!soundId) {
        sound.play(soundId);
      } else {
        soundId = sound.play();
      }
    }
  } else if (!springSystemIsMoving && springSystemWasMoving) {
    sound.fade(1.0, 0, 1 * 1000);
    fadeTimeout = setTimeout(() => {
      soundIsPlaying = false;
      sound.pause();
    }, 1 * 1000);
  }

  springSystemWasMoving = springSystemIsMoving;
}
