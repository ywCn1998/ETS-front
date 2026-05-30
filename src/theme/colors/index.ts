import { Color } from '@mui/material';

export { default as AMBER } from './amber';
export { default as BLUE } from './blue';
export { default as CAYAN } from './cayan';
export { default as EMERALD } from './emeralds';
export { default as GREEN } from './green';
export { default as GRAY } from './grey';
export { default as INFO } from './info';
export { default as LIME } from './lime';
export { default as ORANGE } from './orange';
export { default as PINK } from './pink';
export { default as RED } from './red';
export { default as TEAL } from './teal';
export { default as VIOLET } from './violet';
export { default as WARNING } from './warning';
export { default as YELLOW } from './yellow';
export { default as PURPLE } from './purple';
export { default as WHITE } from './white';


export function createColorObject(COLOR: Color) {
  return {
    lighter: COLOR[100],
    light: COLOR[300],
    main: COLOR[500],
    dark: COLOR[600],
    darker: COLOR[700],
  };
}