export const isBrowser = typeof window !== 'undefined'; // NOTE: `!!process.browser` -- tsserver 6385: `browser` is deprecated
export const isLocalhost = isBrowser && window.location.host.startsWith('localhost');

export const nodeEnv = process.env.NODE_ENV;
export const isTest = !!process.env.isTest;

export const isDev = isTest || nodeEnv === 'development';
export const isProd = !isDev;
export const isDevBrowser = isDev && isBrowser;

export const isDebug = isDev;
