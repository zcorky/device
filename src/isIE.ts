import getUa from './getUa';

export default function isFirefox() {
  const ua: string = getUa();
  return /msie (\d+\.\d+)/i.test(ua);
}
