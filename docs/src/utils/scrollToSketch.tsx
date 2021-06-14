import { getUrlParam } from "./urlParams";

export default function scrollToSketch() {
  const name = getUrlParam("sketch");
  if (!!name) {
    const elem = document.getElementById(name);
    elem?.scrollIntoView();
  }
}
