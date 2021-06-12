import { sketches } from "../sketches";
import React from "react";
import SketchFrame from "./SketchFrame";
import {
  FRAME_SIZE,
  GALLERY_WIDTH,
  GAP_SIZE_IN_UNITS,
  NUM_COLS,
  PIXELS_PER_UNIT,
} from "../galleryDimensions";

export default function Gallery() {
  return (
    <div
      className={`grid grid-cols-${NUM_COLS.toString()} gap-${GAP_SIZE_IN_UNITS.toString()} w-full`}
    >
      {sketches.map((sketch) => (
        <SketchFrame sketch={sketch} frameSize={FRAME_SIZE} />
      ))}
    </div>
  );
}
