import os from './os';

import isNativeApp from './isNativeApp';
import getNativeApp from './getNativeApp';

import isWeixin from './isWeixin';
import isQQ from './isQQ';
import isWeibo from './isWeibo';

import isChrome from './isChrome';
import isSafari from './isSafari';
import isQQBrowser from './isQQBrowser';
import isFirefox from './isFirefox';
import isIE from './isIE';

export default function () {
  const ts = {
    os: os(),
    browser: null,
    app: null,
  };

  if (isNativeApp()) {
    ts.app = getNativeApp();
  } else if (isWeixin()) {
    ts.app = 'wexin';
  } else if (isWeibo()) {
    ts.app =  'weibo';
  } else if (isQQ()) {
    ts.app = 'qq';
  }
  
  if (isChrome()) {
    ts.browser = 'chrome';
  } else if (isSafari()) {
    ts.browser = 'safari';
  } else if (isFirefox()) {
    ts.browser = 'firefox';
  } else if (isIE()) {
    ts.browser = 'ie'
  }
}