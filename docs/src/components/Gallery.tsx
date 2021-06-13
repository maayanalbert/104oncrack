import { sketches } from "../sketches";
import React from "react";
import SketchFrame from "./SketchFrame";
import {
  calcGalleryWidth,
  GAP_SIZE,
  MIN_NUM_COLS,
  NUM_COLS,
  SIDE_PADDING_IN_UNITS,
  UNITS_TO_PIXELS,
} from "../galleryDimensions";
import useEventListener from "../useEventListener";

export default function Gallery() {
  const [numCols, setNumCols] = React.useState<number>(NUM_COLS);
  useEventListener("resize", () => {
    if (
      window.innerWidth >
      calcGalleryWidth(NUM_COLS) + SIDE_PADDING_IN_UNITS * UNITS_TO_PIXELS * 2
    ) {
      setNumCols(NUM_COLS);
    } else {
      setNumCols(MIN_NUM_COLS);
    }
  });

  return (
    <div
      style={{
        display: "grid",
        gap: GAP_SIZE,
        gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
      }}
      className={`w-full xl:grid-cols-2 lg:grid-cols-1`}
    >
      {sketches.map((sketch) => (
        <SketchFrame sketch={sketch} />
      ))}
    </div>
  );
}
