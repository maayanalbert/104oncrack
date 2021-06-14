import { getUrlWithSetParam } from "./urlParams";
import openInNewTab from "./openInNewTab";

export default function addSketchUrlToClipboard(sketchName: string) {
  const url = getUrlWithSetParam("sketch", sketchName);
  openInNewTab(url);
}
