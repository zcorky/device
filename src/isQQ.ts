import getUa from './getUa';

export default function isWeixin() {
  const ua = getUa();
  return /\ QQ\//i.test(ua);
}
