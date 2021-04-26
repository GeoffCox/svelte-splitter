import { Tweened, tweened } from "svelte/motion";

// adapted from https://livebook.manning.com/book/svelte-and-sapper-in-action/chapter-10/v-5/57

// This extracts two hex characters from an "rrggbb" color string
// and returns the value as a number between 0 and 255.
const getColor = (hex : string, index : number) => parseInt(hex.substring(index, index + 2), 16);

// This gets an array of red, green, and blue values in
// the range 0 to 255 from an "rrggbb" hex color string.
const getRGBs = (hex : string) => {
  const start = (hex[0] === '#') ? 1 : 0;
  return [getColor(hex, start), getColor(hex, start + 2), getColor(hex, start + 4)];
};

// This computes a value that is t% of the way from
// start to start + delta where t is a number between 0 and 1.
const scaledValue = (start, delta, t) => start + delta * t;

// This converts a decimal number to a two-character hex number.
const decimalToHex = (decimal : number) : string =>
  Math.round(decimal).toString(16).padStart(2, "0");

// This is an interpolate function used by the tweened function.
const rgbInterpolate = (fromColor, toColor) => {
  const poundPrefix = toColor[0] === '#';
  const [fromRed, fromGreen, fromBlue] = getRGBs(fromColor);
  const [toRed, toGreen, toBlue] = getRGBs(toColor);
  const deltaRed = toRed - fromRed;
  const deltaGreen = toGreen - fromGreen;
  const deltaBlue = toBlue - fromBlue;

  return (t) => {
    const red = scaledValue(fromRed, deltaRed, t);
    const green = scaledValue(fromGreen, deltaGreen, t);
    const blue = scaledValue(fromBlue, deltaBlue, t);
    return `${poundPrefix ? '#' : ''}${decimalToHex(red)}${decimalToHex(green)}${decimalToHex(blue)}`;
  };
};

/**
 * Given a start color, provides tweened transition to another color when set.
 * @param color A hex color string i.e. #0f2c4A or 0f2c4a
 * @returns A hex color string matching the format of the set color.
 */
export const tweenedColor = (color: string) : Tweened<string> => {    
  return tweened(color, {
    duration: 300,
    interpolate: rgbInterpolate,
  }); 
};
