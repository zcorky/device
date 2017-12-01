import getUa from './getUa';

export function isChrome() {
  const ua = getUa();
  return ua.toLowerCase().indexOf('chrome') >= 0;
}
