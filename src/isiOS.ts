import getUa from './getUa';

export default function isIOS() {
  const ua = getUa();
  return /iPhone|iPad|iPod/i.test(ua);
}

export function version() {
  const ua = getUa();
  const _ = /iPhone\sOS\s([\d_]+)|iPad.*OS\s([\d_]+)/i.exec(ua);

  return _[0].indexOf('iPhone') !== -1 ? _[1].replace(/_/, '.') : _[2].replace(/_/, '.');
}