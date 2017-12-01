export default function getWindowSize() {
  return {
    screenWidth: window.screen ? window.screen.width : -1,
    screenHeight: window.screen ? window.screen.height : -1,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
    width: window.innerWidth || window.document && window.document.documentElement && (window.document.documentElement as any).width,
    height: window.innerHeight || window.document && window.document.documentElement && (window.document.documentElement as any).height,
  };
}