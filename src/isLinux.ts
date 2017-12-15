import getUa from './getUa';

export default function isLinux() {
  const ua: string = getUa();
  return /linux/i.test(ua);
}
