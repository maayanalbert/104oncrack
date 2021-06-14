import React, { useEffect } from "react";
import Gallery from "./components/Gallery";
import Title from "./components/Title";
import Bottom from "./components/Bottom";
import { MAX_WIDTH, SIDE_PADDING } from "./utils/galleryDimensions";
import scrollToSketch from "./utils/scrollToSketch";

function App() {
  useEffect(() => {
    scrollToSketch();
  });
  return (
    <div
      className="h-screen flex justify-center"
      style={{
        paddingLeft: SIDE_PADDING,
        paddingRight: SIDE_PADDING,
      }}
    >
      <div>
        <Title />
        <Gallery />
        <Bottom />
      </div>
    </div>
  );
}

export default App;
