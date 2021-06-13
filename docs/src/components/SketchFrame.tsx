import { Sketch } from "../sketches";
import React from "react";
import { FRAME_SIZE } from "../galleryDimensions";
import { Transition } from "@headlessui/react";
import openInNewTab from "../openInNewTab";

interface Props {
  sketch: Sketch;
}

export default function SketchFrame({ sketch }: Props) {
  const [mouseOver, setMouseOver] = React.useState<boolean>(false);
  const scale = 0.75;

  return (
    <div
      className="overflow-hidden"
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
            className="flex justify-end pt-3 pr-3 cursor-pointer"
            onClick={() => openInNewTab(sketch.code)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              style={{ zIndex: 1 }}
              viewBox="0 0 20 20"
              fill={sketch.dark ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"}
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </div>
        </Transition>
      </div>
    </div>
  );
}
