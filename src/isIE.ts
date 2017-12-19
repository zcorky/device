import getUa from './getUa';

export default function isFirefox() {
  const ua: string = getUa();
  return /msie (\d+\.\d+)/i.test(ua);
}

export function version() {
  const ua = getUa();
  return /MSIE ([0-9]{1,}[\.0-9]{0,})/i.exec(ua)[1];
}
