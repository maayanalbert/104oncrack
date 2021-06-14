import { sketches } from "../utils/sketches";
import React from "react";
import SketchFrame from "./SketchFrame";
import {
  calcNeededWidthWidth,
  GAP_SIZE,
  MIN_NUM_COLS,
  NUM_COLS,
} from "../utils/galleryDimensions";
import useEventListener from "../utils/useEventListener";

export default function Gallery() {
  const [numCols, setNumCols] = React.useState<number>(
    window.innerWidth > calcNeededWidthWidth(NUM_COLS) ? NUM_COLS : MIN_NUM_COLS
  );
  useEventListener("resize", () => {
    if (window.innerWidth > calcNeededWidthWidth(NUM_COLS)) {
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
