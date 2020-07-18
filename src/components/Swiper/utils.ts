/**
 * 计算队列的位置
 * @param current 当前位置 number
 * @param length 队列长度 number
 *
 * 0, 5 -> 4-5-1-2-3-4-5
 * 1, 5 -> 5-1-2-3-4-5-1
 * 2, 5 -> 1-2-3-4-5-1-2
 * 3, 5 -> 2-3-4-5-1-2-3
 * 4, 5 -> 3-4-5-1-2-3-4
 */

export const computeQueue = (current: number = 0, length: number) => {
  if (!length) {
    return [];
  }
  if (length === 1) {
    return [current];
  }
  if (length === 2) {
    return [current, Math.abs(current - 1), current, Math.abs(current - 1), current];
  }
  if (current < 3) {
    return Array(2 - current)
      .fill(null)
      .map(function(_, i) {
        return length + current + i - 2;
      })
      .concat(
        Array(length)
          .fill(null)
          .map(function(_, i) {
            return i;
          })
      )
      .concat(
        Array(current)
          .fill(null)
          .map(function(_, i) {
            return i;
          })
      );
  } else {
    return Array(length - current + 2)
      .fill(null)
      .map(function(_, i) {
        return i + current - 2;
      })
      .concat(
        Array(current)
          .fill(null)
          .map(function(_, i) {
            return i;
          })
      );
  }
};
