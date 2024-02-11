import tinycolor from 'tinycolor2';

import { TColor } from 'src/core/types';

// TODO: Move static colors to constants?
export function getStaticColorsList(): TColor[] {
  return [
    '#2dc3d2',
    '#3483ba',
    '#40a840',
    '#556171',
    '#5c5c10',
    '#681313',
    '#6b6b45',
    '#6f3a5f',
    '#7c3e06',
    '#868686',
    '#8b8b8b',
    '#96665c',
    '#9d75c2',
    '#a1e194',
    '#a6dce6',
    '#b5cbe9',
    '#c7a39b',
    '#c9a59d',
    '#c9b7d8',
    '#cbcbcb',
    '#d93c3c',
    '#e483c7',
    '#f6bcd5',
    '#fe8b25',
    '#fea19f',
    '#fec184',
    // 'yellow',
  ];
}

export function getColorForIndex(idx: number): TColor {
  const colors = getStaticColorsList();
  let colorIdx = idx % colors.length;
  if (colorIdx < 0) {
    colorIdx = colors.length + colorIdx;
  }
  return colors[colorIdx];
}

export function getRandomColor(): TColor {
  const colors = getStaticColorsList();
  const maxColor = colors.length - 1;
  const randomIdx = Math.round(Math.random() * maxColor);
  return colors[randomIdx];
}

export function checkValidHexColor(color?: TColor | string) {
  // '#xxxxxx', '#xxx'
  return !!color && /^#([0-9a-f]{6}|[0-9a-f]{3})$/.test(color);
}

export function createColorsGradientSteps(
  stepsCount: number,
  startColor: TColor,
  endColor: TColor,
) {
  if (!stepsCount || !startColor || !endColor) {
    return;
  }
  if (stepsCount < 2) {
    // Only one step?
    return [startColor];
  }
  if (stepsCount === 2) {
    // Two steps?
    return [startColor, endColor];
  }
  const startColorObj = tinycolor(startColor);
  const endColorObj = tinycolor(endColor);
  // const stepSize = 100 / stepsCount;
  const stepsList: TColor[] = [];
  const lastStep = stepsCount;
  for (let step = 0; step <= lastStep; step++) {
    const amount = (100 * step) / lastStep;
    const mixColor = tinycolor.mix(startColorObj, endColorObj, amount);
    const color = mixColor.toHexString() as TColor;
    stepsList.push(color);
  }
  return stepsList;
}
