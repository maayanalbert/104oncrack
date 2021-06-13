import React from "react";
import Gallery from "./components/Gallery";
import Title from "./components/Title";
import Bottom from "./components/Bottom";
import { SIDE_PADDING } from "./galleryDimensions";

function App() {
  return (
    <div
      className="h-screen flex justify-center"
      style={{ paddingLeft: SIDE_PADDING, paddingRight: SIDE_PADDING }}
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
