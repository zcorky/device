import getUa from './getUa';

export default function isWeixin() {
  const ua = getUa();
  return /Weibo/i.test(ua);
}

export function version() {
  const ua = getUa();
  return /Weibo\s.*__weibo__([^_]+)__/.exec(ua)[1];
}
