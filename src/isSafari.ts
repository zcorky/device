import getUa from './getUa';

export default function isSafari() {
  const ua: string = getUa();
  return /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua);
}

export function version() {
  const ua = getUa();
  return /Safari\/([\d\.]+)/i.exec(ua)[1];
}