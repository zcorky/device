import isAndroid from './isAndroid';
import isiOS from './isiOS';
import isMacOS from './isMacOS';
import isWindows from './isWindows';
import isLinux from './isLinux';

export default function os() {
  if (isAndroid()) {
    return 'android';
  } else if (isiOS()) {
    return 'ios';
  } else if (isMacOS()) {
    return 'macos';
  } else if (isWindows()) {
    return 'windows';
  } else if (isLinux()) {
    return 'linux';
  } else {
    return 'unknown';
  }
}