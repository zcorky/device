import getUa from './getUa';

export default function isWeixin() {
  const ua = getUa();
  return /\ QQ\//i.test(ua);
}

export function version() {
  const ua = getUa();
  return /\ QQ\/([^\s]+)/i.exec(ua)[1];
}
