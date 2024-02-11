/** @desc Re-export parsed and typed scss variables */

import cssVariables from './variables.module.scss';

const themeControlsRadius = parseInt(cssVariables.themeControlsRadiusPx);

const transitionTime = parseInt(cssVariables.transitionTimeMs);
const animationTime = parseInt(cssVariables.animationTimeMs);
const disappearTime = parseInt(cssVariables.disappearTimeMs);

const {
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

export {
  // Dimensions...
  themeControlsRadius,

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
