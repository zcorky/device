import getUa from './getUa';

export default function isWeixin() {
  const ua = getUa();
  return /MicroMessenger/i.test(ua);
}
