import React from "react";
import Gallery from "./components/Gallery";
import { GALLERY_WIDTH } from "./galleryDimensions";
import Title from "./components/Title";
import Bottom from "./components/Bottom";

function App() {
  return (
    <div className="h-screen flex justify-center">
      <div style={{ width: GALLERY_WIDTH }}>
        <Title />
        <Gallery />
        <Bottom />
      </div>
    </div>
  );
}

export default App;
