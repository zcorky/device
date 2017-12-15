import getUa from './getUa';

export default function isQQBrowser() {
  const ua: string = getUa();
  return /MQQBrowser/i.test(ua);
}
