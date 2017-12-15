import getUa from './getUa';

export default function isMacOS() {
  const ua: string = getUa();
  return /macintosh/i.test(ua);
}
