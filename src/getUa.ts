let userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;

export default function getUa() {
  return userAgent;
}

export function inject(ua) {
  userAgent = ua;
}