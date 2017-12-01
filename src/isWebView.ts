import getUa from './getUa';
import getIpad from './getIpad';
import getIpod from './getIpod';
import getIphone from './getIphone';

export default function isWebView() {
  const ua = getUa();
  const ipad = getIpad();
  const ipod = getIpod();
  const iphone = getIphone();
  return !!(iphone || ipad || ipod) && !!ua.match(/.*AppleWebKit(?!.*Safari)/i);
}