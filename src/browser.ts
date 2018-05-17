
import isSafari, { version as safariVersion } from './isSafari';
import isChrome, { version as chromeVersion } from './isChrome';
import isFirefox, { version as firefoxVersion } from './isFirefox';
import isIE, { version as ieVersion } from './isIE';
import isQQBrowser, { version as qqbrowserVersion } from './isQQBrowser';

export default function browser() {
  if (isSafari()) {
    return { name: 'safari', version: safariVersion() };
  } else if (isChrome()) {
    return { name: 'chrome', version: chromeVersion() };
  } else if (isFirefox()) {
    return { name: 'firefox', version: firefoxVersion() };
  } else if (isIE()) {
    return { name: 'ie', version: ieVersion() };
  } else if (isQQBrowser()) {
    return { name: 'qq', version: qqbrowserVersion() };
  } else {
    return { name: null, version: null };
  }
}
