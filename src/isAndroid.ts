import getUa from './getUa';

export default function isAndroid() {
  const ua = getUa();
  return /Android/i.test(ua);
}

export function version() {
  const ua = getUa();
  return /Android\s(\d+\.\d+)/i.exec(ua)[1];
}