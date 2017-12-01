import getUa from "./getUa";

export default function isMobile() {
  const ua = getUa();

  return ua.toLowerCase().indexOf('mobile') !== -1;
}