import { Sketch } from "../sketches";

interface Props {
  sketch: Sketch;
  frameSize: number;
}

export default function SketchFrame({ sketch, frameSize }: Props) {
  const scale = 0.75;
  return (
    <div>
      <div style={{ width: frameSize, height: frameSize }}>
        <iframe
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
