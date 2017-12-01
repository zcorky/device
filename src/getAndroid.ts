import getUa from './getUa';

export default function getAndroid() {
  const ua = getUa();
  return ua.match(/(Android);?[\s\/]+([\d.]+)?/);
}