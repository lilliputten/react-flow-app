import { isDev } from './env';

export const defaultToastDelay = isDev ? 1500 : 1000;

/** App title. Don't forget to sync it in `public/index.html` */
export const appTitle = 'React flow data visualizer';
