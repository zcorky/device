import getUa from './getUa';

export default function isMacOS() {
  const ua: string = getUa();
  return /macintosh/i.test(ua);
}

export function version() {
  const ua = getUa();
  return /Mac\sOS\sX\s((\d+_\d+_\d+)|(\d+\.\d+))/i.exec(ua)[1];
}
