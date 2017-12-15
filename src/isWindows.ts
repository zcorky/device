import getUa from './getUa';

export default function isWindows() {
  const ua: string = getUa();
  return /windows/i.test(ua);
}
