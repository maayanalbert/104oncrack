export const FRAME_SIZE = 600;
export const GAP_SIZE_IN_UNITS = 1;
export const NUM_COLS = 2;
export const PIXELS_PER_UNIT = 4;
export const GALLERY_WIDTH =
  FRAME_SIZE * NUM_COLS +
  PIXELS_PER_UNIT * (GAP_SIZE_IN_UNITS * (NUM_COLS - 1));

export const MIN_FRAME_SIZE = 400;
export const MIN_GALLERY_WIDTH =
  MIN_FRAME_SIZE * NUM_COLS +
  PIXELS_PER_UNIT * (GAP_SIZE_IN_UNITS * (NUM_COLS - 1));
