import { Sketch } from "../sketches";
import React from "react";

interface Props {
  sketch: Sketch;
  frameSize: number;
}

export default function SketchFrame({ sketch, frameSize }: Props) {
  const scale = 0.75;

  return (
    <div>
      <div style={{ width: frameSize, height: frameSize }} className="relative">
        <a
          className="w-full h-full absolute"
          style={{ background: "rgb(0, 0, 0)" }}
        />

        <iframe
          loading="lazy"
          src={sketch.url}
          title={sketch.name}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: frameSize / scale,
            height: frameSize / scale,
          }}
        />
      </div>
    </div>
  );
}
