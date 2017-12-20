import getAndroid from "./getAndroid";
import getIpad from "./getIpad";
import getIpod from "./getIpod";
import getIphone from "./getIphone";
import getUa from "./getUa";

import isMacOS, { version as macOSVersion} from './isMacOS';
import isWindows, { version as windowsVersion } from './isWindows';

export default function getVersion() {
  const device = {
    os: null,
    osVersion: null,
    ios: false,
  };

  const ua = getUa();
  const android = getAndroid();
  const ipad = getIpad();
  const ipod = getIpod();
  const iphone = getIphone();

  if (android) {
    device.os = 'android';
    device.osVersion = android[2];
  } else if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;

    if (iphone && !ipod) {
      device.osVersion = iphone[2].replace(/_/g, '.');
    } else if (ipad) {
      device.osVersion = ipad[2].replace(/_/g, '.');
    } else if (ipod) {
      device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    }
  } else if (isMacOS()) {
    device.os = 'macos';
    device.osVersion = macOSVersion();
  } else if (isWindows()) {
    device.os = 'windows';
    device.osVersion = windowsVersion();
  }

  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.toLowerCase().indexOf('version/') >= 0) {
      if (device.osVersion.split('.')[0] === '10') {
          device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
      }
  }

  return device.osVersion;
}