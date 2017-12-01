import getUa from './getUa';

export default function getIpad() {
  const ua = getUa();
  return ua.match(/(iPad).*OS\s([\d_]+)/);
}