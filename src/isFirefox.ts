import getUa from './getUa';

export default function isFirefox() {
  const ua: string = getUa();
  return /firefox\/(\d+\.\d+)/i.test(ua);
}

export function version() {
  const ua = getUa();
  return /firefox\/(\d+\.\d+)/i.exec(ua)[1];
}