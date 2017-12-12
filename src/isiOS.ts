import getUa from './getUa';

export default function isIOS() {
  const ua = getUa();
  return /iPhone|iPad|iPod/i.test(ua);
}