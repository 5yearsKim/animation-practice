
const COL = 2;

const SIZE = 100;

export const getPosition = (position) => {
  'worklet';
  return {
    x: (position % COL) * SIZE,
    y: Math.floor(position / COL) * SIZE,
  };
}

export const getOrder = (tx, ty, max) => {
  'worklet'
  let col = Math.round(tx / SIZE);
  col = Math.min(Math.max(row, 0), COL -1);
  let row = Math.round(ty / SIZE);
  row = Math.max(col, 0);
  return Math.min(row * COL + col, max);
}
