import getUa from './getUa';

export default function isFirefox() {
  const ua: string = getUa();
  return /firefox\/(\d+\.\d+)/i.test(ua);
}
