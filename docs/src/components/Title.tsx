import React from "react";
import { MAX_WIDTH } from "../utils/galleryDimensions";

export default function Title() {
  return (
    <div className="pt-28 pb-16" style={{ maxWidth: MAX_WIDTH }}>
      <div className="text-9xl -ml-8">104oncrack</div>
      <div className="text-2xl font-light pt-2">
        because 2 semesters of taking and teaching{" "}
        <a href="http://cmuems.com/2015c/" target="_blank" rel="noreferrer">
          15-104
        </a>{" "}
        wasn't enough. new drops every thursday because that was when the
        homeworks were due
      </div>

      <div className="text-2xl font-light pt-2">
        <a
          href="https://www.instagram.com/104oncrack/"
          target="_blank"
          rel="noreferrer"
        >
          insta
        </a>{" "}
        -{" "}
        <a
          href="https://www.github.com/maayanalbert/104oncrack"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
      </div>
    </div>
  );
}
