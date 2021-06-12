import React from "react";
import SketchFrame from "./SketchFrame";
import { sketches } from "./sketches";

function App() {
  const frameSize = 600;
  const gapSizeInUnits = 1;
  const numCols = 2;
  const pixelsPerUnit = 4;

  return (
    <div className="h-screen">
      <div className="flex justify-center">
        <div
          className={`grid grid-cols-${numCols.toString()} gap-${gapSizeInUnits.toString()}`}
          style={{
            width:
              frameSize * numCols +
              pixelsPerUnit * (gapSizeInUnits * (numCols - 1)),
          }}
        >
          {sketches.map((sketch) => (
            <SketchFrame sketch={sketch} frameSize={frameSize} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
