import { Sketch } from "../utils/sketches";
import React, { useEffect } from "react";
import { FRAME_SIZE } from "../utils/galleryDimensions";
import useSound from "../utils/useSound";
import FrameTrimmings from "./FrameTrimmings";

interface Props {
  sketch: Sketch;
}

export default function SketchFrame({ sketch }: Props) {
  const [mouseOver, setMouseOver] = React.useState<boolean>(false);
  const scale = 0.75;

  const { playSound, pauseSound } = useSound(sketch.soundtrack.audioFile);

  return (
    <div
      className="overflow-hidden"
      id={sketch.name}
      onMouseOver={() => {
        setMouseOver(true);
        playSound();
      }}
      onMouseLeave={() => {
        setMouseOver(false);
        pauseSound();
      }}
      style={{ width: FRAME_SIZE, height: FRAME_SIZE }}
    >
      <div className="relative">
        <span
          className="absolute"
          style={{
            background: "rgb(0, 0, 0)",
            width: FRAME_SIZE,
            height: FRAME_SIZE,
          }}
        />

        <iframe
          className="absolute"
          loading="lazy"
          src={sketch.url}
          title={sketch.name}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: Math.ceil(FRAME_SIZE / scale),
            height: Math.ceil(FRAME_SIZE / scale),
          }}
        />
        <FrameTrimmings mouseOver={mouseOver} sketch={sketch} />
      </div>
    </div>
  );
}
