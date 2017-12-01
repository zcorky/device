import getUa from './getUa';

export default function getIpod() {
  const ua = getUa();
  return ua.match(/(iPod)(.*OS\s([\d_]+))?/);
}