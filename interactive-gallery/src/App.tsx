import React from "react";
import Gallery from "./components/Gallery";
import { GALLERY_WIDTH } from "./galleryDimensions";
import Title from "./components/Title";

function App() {
  return (
    <div className="h-screen flex justify-center">
      <div style={{ width: GALLERY_WIDTH }}>
        <Title />
        <Gallery />
      </div>
    </div>
  );
}

export default App;
