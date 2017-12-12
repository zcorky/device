import getUa from "./getUa";

export default function isMobile() {
  const ua = getUa();

  return /mobile/i.test(ua);
}