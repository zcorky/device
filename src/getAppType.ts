import os from './os';
import osVersion from './version';

import isNativeApp from './isNativeApp';
import getNativeApp from './getNativeApp';

import isWeixin, { version as weixinVersion } from './isWeixin';
import isQQ, { version as qqVersion } from './isQQ';
import isWeibo, { version as weiboVersion } from './isWeibo';

import isChrome, { version as chromeVersion } from './isChrome';
import isSafari, { version as safariVersion } from './isSafari';
import isQQBrowser, { version as qqbrowserVersion } from './isQQBrowser';
import isFirefox from './isFirefox';
import isIE, { version as ieVersion } from './isIE';

export default function () {
  const ts = {
    os: os(),
    osVersion: osVersion(),
    browser: null,
    browserVersion: null,
    app: null,
    appVersion: null,
  };

  if (isNativeApp()) {
    const { app: ap, appVersion: apv } = getNativeApp();
    ts.app = ap;
    ts.appVersion = apv;
  } else if (isWeixin()) {
    ts.app = 'wexin';
    ts.appVersion = weixinVersion();
  } else if (isWeibo()) {
    ts.app =  'weibo';
    ts.appVersion = weiboVersion();
  } else if (isQQ()) {
    ts.app = 'qq';
    ts.appVersion = qqVersion();
  }
  
  if (isQQBrowser()) {
    ts.browser = 'qqbrowser';
    ts.browserVersion = qqbrowserVersion();
  } else if (isChrome()) {
    ts.browser = 'chrome';
    ts.browserVersion = chromeVersion();
  } else if (isSafari()) {
    ts.browser = 'safari';
    ts.browserVersion = safariVersion();
  } else if (isFirefox()) {
    ts.browser = 'firefox';
    ts.browserVersion = null;
  } else if (isIE()) {
    ts.browser = 'ie';
    ts.browserVersion = ieVersion();
  }

  return ts;
}