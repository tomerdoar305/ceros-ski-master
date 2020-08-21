export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function intersectTwoRects(rect1, rect2) {
  return !(
    rect2.left > rect1.right ||
    rect2.right < rect1.left ||
    rect2.top > rect1.bottom ||
    rect2.bottom < rect1.top
  );
}

export class Rect {
  left = 0;
  top = 0;
  right = 0;
  bottom = 0;

  constructor(left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }
}

/*
  Generic function that find and return a free open position witin the screen.
  It is beening use for placing obstacle and rhinos.
*/
export function calculateOpenPosition(
  minX,
  maxX,
  minY,
  maxY,
  list = [],
  distance
) {
  const x = randomInt(minX, maxX);
  const y = randomInt(minY, maxY);

  const foundCollision = list.find((item) => {
    return (
      x > item.x - distance &&
      x < item.x + distance &&
      y > item.y - distance &&
      y < item.y + distance
    );
  });

  if (foundCollision) {
    return calculateOpenPosition(minX, maxX, minY, maxY);
  } else {
    return {
      x: x,
      y: y,
    };
  }
}
