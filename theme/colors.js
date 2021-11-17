export const hslColors = {
  primary: 'hsl(203, 39%, 44%)',

  primary02: 'hsl(88, 38%, 15%)',

  base: 'hsl(52, 94%, 94%)',

  // #F6DD79
  notificationWarning: 'hsl(48, 87%, 72%)',

  // #91D5A5
  notificationSuccess: 'hsl(138, 45%, 70%)',

  // #91D5A5
  notificationSuccessHover: 'hsl(138, 45%, 76%)',

  // #F17E85
  notificationError: 'hsl(356, 80%, 72%)',

  // #ADC8F1
  notificationInformation: 'hsl(216, 71%, 81%)',

  white: 'hsl(0, 0%, 100%)',

  black: 'hsl(0, 0%, 0%)',

  gray: 'hsl(0, 0%, 90%)',
};

const hslToRgb = (h, s, l) => {
  let r;
  let g;
  let b;

  if (s === 0) {
    r = l;
    g = l;
    b = l; // achromatic
  } else {
    const hue2rgb = function hue2rgb(p, q, t) {
      // eslint-disable-next-line no-param-reassign
      if (t < 0) t += 1;
      // eslint-disable-next-line no-param-reassign
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

const makeColors = (rawColors) => {
  let returnObject = {};

  Object.entries(rawColors).map(([key, hsl]) => {
    const match = hsl.match(/^hsl\((\d+),\s(\d+)%,\s(\d+)%\)/);
    if (!match) {
      throw new Error(`Invalid color ${hsl}`);
    }
    const [h, s, l] = match.slice(1).map((a) => Number(a));
    const hslArr = [h / 360, s / 100, l / 100];
    const rgbArr = hslToRgb(hslArr[0], hslArr[1], hslArr[2]);
    returnObject[key] = { rgb: rgbArr };
    return;
  });
  return returnObject;
};

export const colors = makeColors(hslColors);
