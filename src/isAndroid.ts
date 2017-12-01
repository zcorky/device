import getAndroid from './getAndroid';

export function isAndroid() {
  return !!getAndroid();
}