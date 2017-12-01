import getUa from './getUa';
import getIpad from './getIpad';

export default function getIphone() {
  const ua = getUa();
  const ipad = getIpad();
  return !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
}