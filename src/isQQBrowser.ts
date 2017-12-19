import getUa from './getUa';

export default function isQQBrowser() {
  const ua: string = getUa();
  return /MQQBrowser/i.test(ua);
}

export function version() {
  const ua = getUa();
  return /\ MQQBrowser\/([^\s]+)/i.exec(ua)[1];
}
