import getIpad from './getIpad';
import getIpod from './getIpod';
import getIphone from './getIphone';

export default function isIOS() {
  const ipad = getIpad();
  const ipod = getIpod();
  const iphone = getIphone();
  return !!(ipad || iphone || ipod);
}