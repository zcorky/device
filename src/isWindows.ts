import getUa from './getUa';

export default function isWindows() {
  const ua: string = getUa();
  return /windows/i.test(ua);
}

export function version() {
  const ua: string = getUa();
  const _ = /windows\snt\s([\d\.]+)/i.exec(ua);

  return _ ? ua[1] : null;
}