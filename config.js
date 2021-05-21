
const COL = 2;

const SIZE = 200;

export const getPosition = (position) => {
  'worklet';
  return {
    x: (position % COL) * SIZE,
    y: Math.floor(position / COL) * SIZE,
  };
}

export const getOrder = (tx, ty, max) => {
  'worklet'
  const row = Math.floor(tx / SIZE);
  const col = Math.floor(ty / SIZE);
  return Math.min(row * COL + col, max);
}
