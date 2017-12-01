let userAgent = navigator && navigator.userAgent;

export default function getUa() {
  return userAgent;
}

export function inject(ua) {
  userAgent = ua;
}