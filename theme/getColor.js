import { colors } from './colors';

const getColor = ({ color, opacity, asRgbNumbers }) => {
  if (!color) {
    throw new Error('You must provide a color');
  }

  if (!Object.keys(colors).includes(color)) {
    throw new Error(`${color} is not part of the design system`);
  }
  const rgbVariant = colors[color].rgb;

  if (asRgbNumbers === true) {
    return `${rgbVariant.join(', ')}`;
  }

  if (typeof opacity === 'number') {
    if (opacity > 1 || opacity < 0) {
      throw new Error('opacity must be between 0 and 1');
    }
    return `rgba(${rgbVariant.join(',')}, ${opacity})`;
  }
  return `rgb(${rgbVariant.join(',')})`;
};

export default getColor;
