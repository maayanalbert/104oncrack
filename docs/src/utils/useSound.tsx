import { Howl, Howler } from "howler";
import React, { useEffect } from "react";
import useEventListener from "./useEventListener";

export default function useSound(audioFile: string) {
  const [soundId, setSoundId] = React.useState<number | undefined>();
  const [soundIsPlaying, setSoundIsPlaying] = React.useState<boolean>(false);
  const [sound, setSound] = React.useState<undefined | Howl>();
  useEventListener("blur", () => {
    pauseSound();
  });

  useEffect(() => {
    const newSound = new Howl({
      src: [`${process.env.PUBLIC_URL}/audio/${audioFile}`],
    });

    setSound(newSound);
  }, []);
  const startNewPlay = () => {
    sound?.volume(0.5);
    const newSoundId = sound?.play();
    setSoundId(newSoundId);
  };

  const playSound = () => {
    if (soundIsPlaying) return;
    setSoundIsPlaying(true);
    if (soundId) {
      sound?.play(soundId);
    } else {
      startNewPlay();
    }
  };

  const pauseSound = () => {
    if (!soundIsPlaying) return;
    setSoundIsPlaying(false);
    sound?.pause();
  };

  sound?.on("end", function () {
    sound?.pause();
    startNewPlay();
  });

  return { playSound, pauseSound };
}
