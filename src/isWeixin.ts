import getUa from './getUa';

export default function isWeixin() {
  const ua = getUa();
  return /MicroMessenger/i.test(ua);
}

export function version() {
  const ua = getUa();
  return /MicroMessenger\/(\d+\.\d+(\.\d+\.\d+)?)/i.exec(ua)[1];
}