import getUa from './getUa';

export default function isWeixin() {
  const ua = getUa();
  return /Weibo/i.test(ua);
}
