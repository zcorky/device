function $(selector) {
  const element = document.querySelector(selector);

  if (element === null) {
    return element;
  }

  element.length = element !== null ? 1 : 0;

  element.attr = (attr) => { return element.getAttribute(attr); };

  element.removeClass = (name) => { element.classList.remove(name); return element; };

  element.addClass = (names) => { element.className = `${element.className} ${names.join(' ')}`; return element};

  return element;
}

export default function device() {
  const ua = navigator.userAgent;

  const device = {
    os: null,
    osVersion: null,
    webView: false,
    minimalUI: false,
    statusBar: false,
    //
    ios: false,
    android: false,
    iphone: false,
    ipad: false,
    androidChrome: false,
    //
    isWeixin: /MicroMessenger/i.test(ua),
    //
    pixelRatio: window.devicePixelRatio || 1,
    // 
    classNames: []
  };

  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

  if (android) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
  } else if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;

    if (iphone && !ipod) {
      device.osVersion = iphone[2].replace(/_/g, '.');
      device.iphone = true;
    } else if (ipad) {
      device.osVersion = ipad[2].replace(/_/g, '.');
      device.ipad = true;
    } else if (ipod) {
      device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
      device.iphone = true;
    }
  }

  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
      if (device.osVersion.split('.')[0] === '10') {
          device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
      }
  }

  // Webview
  device.webView = (iphone || ipad || ipod) && !!ua.match(/.*AppleWebKit(?!.*Safari)/i);

  // Minimal UI
  if (device.os === 'ios') {
    const osVersionArr = device.osVersion.split('.');
    device.minimalUI = !device.webView
      && (ipad || iphone)
      && (osVersionArr[0] * 1 === 7) ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7
      && $('meta[name="viewport"]') && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
  }

  // Check for status bar and fullscreen app mode
  const windowWidth = window.outerWidth;
  const windowHeight = window.outerHeight;
  if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
      device.statusBar = true;
  }

  // Class: pixelRatio
  const classNames = [];
  classNames.push(`pixel-ratio-${Math.floor(device.pixelRatio)}`);
  if (device.pixelRatio >= 2) {
    classNames.push('retina');
  }

  // Class: os
  if (device.os) {
    classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));

    if (device.ios) {
      const major = parseInt(device.osVersion.split('.')[0], 10);
      for (let i = major - 1; i >= 6; i--) {
          classNames.push('ios-gt-' + i);
      }
    }
  }

  // if (device.statusBar) {
  //   classNames.push('with-statusbar-overlay');
  // } else {
  //   $('html').removeClass('with-statusbar-overlay');
  // }

  // if (classNames.length > 0) $('html').addClass(classNames);

  return device;
}