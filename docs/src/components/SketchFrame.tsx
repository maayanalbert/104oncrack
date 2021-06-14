import { Sketch } from "../utils/sketches";
import React from "react";
import { FRAME_SIZE } from "../utils/galleryDimensions";
import { Transition } from "@headlessui/react";
import openInNewTab from "../utils/openInNewTab";
import addSketchUrlToClipboard from "../utils/getSketchUrl";

interface Props {
  sketch: Sketch;
}

export default function SketchFrame({ sketch }: Props) {
  const [mouseOver, setMouseOver] = React.useState<boolean>(false);
  const scale = 0.75;

  return (
    <div
      className="overflow-hidden"
      id={sketch.name}
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      style={{ width: FRAME_SIZE, height: FRAME_SIZE }}
    >
      <div className="relative">
        <span
          className="absolute"
          style={{
            background: "rgb(0, 0, 0)",
            width: FRAME_SIZE,
            height: FRAME_SIZE,
          }}
        />

        <iframe
          className="absolute"
          loading="lazy"
          src={sketch.url}
          title={sketch.name}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: Math.ceil(FRAME_SIZE / scale),
            height: Math.ceil(FRAME_SIZE / scale),
          }}
        />
        <Transition
          show={mouseOver}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`flex flex-col justify-between p-3 items-end font-normal ${
              sketch.dark ? "text-white" : "text-dark"
            }`}
            style={{ height: FRAME_SIZE }}
          >
            <div className="flex flex-row justify-between w-full">
              <div style={{ zIndex: 1 }}>{sketch.description} </div>
              <div className="cursor-pointer flex flex-row">
                <div
                  onClick={() => openInNewTab(sketch.code)}
                  style={{ zIndex: 1 }}
                >
                  {/*edit*/}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill={sketch.dark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"}
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                <span className="p-2" />

                <div
                  onClick={() => addSketchUrlToClipboard(sketch.name)}
                  style={{ zIndex: 1 }}
                >
                  {/*share*/}
                  <svg
                    fill={sketch.dark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div style={{ zIndex: 1 }}>
              {`${sketch.date.getMonth()}-${sketch.date.getDate()}-${sketch.date.getFullYear()}`}
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
