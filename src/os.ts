import isAndroid from './isAndroid';
import isiOS from './isiOS';

export default function os() {
  if (isAndroid()) {
    return 'android';
  } else if (isiOS()) {
    return 'ios';
  } else {
    return 'unknown';
  }
}