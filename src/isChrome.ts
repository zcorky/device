import getUa from './getUa';

export default function isChrome() {
  const ua = getUa();
  return ua.toLowerCase().indexOf('chrome') >= 0;
}
