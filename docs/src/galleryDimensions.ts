export const FRAME_SIZE = 550;
export const GAP_SIZE = 4;
export const NUM_COLS = 2;
export const SIDE_PADDING_IN_UNITS = 10;
export const UNITS_TO_PIXELS = 4;

export const MIN_NUM_COLS = 1;
export function calcGalleryWidth(numCols: number) {
  return FRAME_SIZE * numCols + GAP_SIZE * (numCols - 1);
}
export const MIN_GALLERY_WIDTH = calcGalleryWidth(MIN_NUM_COLS);
export const GALLERY_WIDTH = calcGalleryWidth(NUM_COLS);
