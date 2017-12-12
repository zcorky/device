import getUa from './getUa';

export default function isAndroid() {
  const ua = getUa();
  return /Android/i.test(ua);
}