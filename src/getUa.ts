let userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;

export default function getUa(): string {
  return userAgent;
}

export function inject(ua) {
  userAgent = ua;
}