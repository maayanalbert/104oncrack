export const FRAME_SIZE = 550;
export const GAP_SIZE = 4;
export const NUM_COLS = 2;
export const SIDE_PADDING = 40;

export const MIN_NUM_COLS = 1;
export function calcNeededWidthWidth(numCols: number) {
  return FRAME_SIZE * numCols + GAP_SIZE * (numCols - 1) + SIDE_PADDING * 2;
}
