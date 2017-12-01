import getAndroid from './getAndroid';

export default function isAndroid() {
  return !!getAndroid();
}