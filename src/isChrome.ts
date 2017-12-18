import getUa from './getUa';

export default function isChrome() {
  const ua = getUa();
  return ua.toLowerCase().indexOf('chrome') >= 0;
}

export function version() {
  const ua = getUa();
  return /chrome\/(\d+\.\d+\.\d+\.\d+)/i.exec(ua)[1];
}