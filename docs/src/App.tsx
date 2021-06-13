import React from "react";
import Gallery from "./components/Gallery";
import {
  GALLERY_WIDTH,
  MIN_GALLERY_WIDTH,
  SIDE_PADDING_IN_UNITS,
} from "./galleryDimensions";
import Title from "./components/Title";
import Bottom from "./components/Bottom";

function App() {
  return (
    <div className={`h-screen flex justify-center px-${SIDE_PADDING_IN_UNITS}`}>
      <div
        style={{
          width: GALLERY_WIDTH,
          minWidth: MIN_GALLERY_WIDTH,
        }}
      >
        <Title />
        <Gallery />
        <Bottom />
      </div>
    </div>
  );
}

export default App;
