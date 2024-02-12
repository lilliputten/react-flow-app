/** @desc Re-export parsed and typed scss variables */

import cssVariables from './variables.module.scss';

const {
  themeControlsRadiusPx,
  defaultFontSizePx,

  transitionTimeMs,
  animationTimeMs,
  disappearTimeMs,

  primaryColor,
  secondaryColor,

  defaultBackgroundColor,
  defaultBackgroundColorDark,

  defaultTextColor,
  defaultTextColorDark,

  defaultLinkColor,
  neutralColor,

  errorColor,
  dangerColor,
  warnColor,
  successColor,
  infoColor,
} = cssVariables;

const themeControlsRadius = parseInt(themeControlsRadiusPx);
const defaultFontSize = parseInt(defaultFontSizePx);

const defaultFontSizeRem = (defaultFontSize * 16) / 10;

const transitionTime = parseInt(transitionTimeMs);
const animationTime = parseInt(animationTimeMs);
const disappearTime = parseInt(disappearTimeMs);

export {
  // Dimensions...
  themeControlsRadiusPx,
  defaultFontSizePx,
  themeControlsRadius,
  defaultFontSize,
  defaultFontSizeRem,

  // Timeouts...
  transitionTime,
  animationTime,
  disappearTime,

  // Colors...
  primaryColor,
  secondaryColor,
  defaultBackgroundColor,
  defaultBackgroundColorDark,
  defaultTextColor,
  defaultTextColorDark,
  defaultLinkColor,
  neutralColor,
  errorColor,
  dangerColor,
  warnColor,
  successColor,
  infoColor,

  // TODO: Export other essential variables?
};
