"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function $(selector) {
    var element = document.querySelector(selector);
    if (element === null) {
        return element;
    }
    element.length = element !== null ? 1 : 0;
    element.attr = function (attr) { return element.getAttribute(attr) || ''; };
    element.removeClass = function (name) { element.classList.remove(name); return element; };
    element.addClass = function (names) { element.className = element.className + " " + names.join(' '); return element; };
    return element;
}
function getUa() {
    return navigator.userAgent;
}
function getAndroid(ua) {
    return ua.match(/(Android);?[\s\/]+([\d.]+)?/);
}
function getIpad(ua) {
    return ua.match(/(iPad).*OS\s([\d_]+)/);
}
function getIpod(ua) {
    return ua.match(/(iPod)(.*OS\s([\d_]+))?/);
}
function getIphone(ua, ipad) {
    return !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
}
function device() {
    var ua = getUa();
    var device = {
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
    var android = getAndroid(ua);
    var ipad = getIpad(ua);
    var ipod = getIpod(ua);
    var iphone = getIphone(ua, ipad);
    if (android) {
        device.os = 'android';
        device.osVersion = android[2];
        device.android = true;
        device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    else if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
        if (iphone && !ipod) {
            device.osVersion = iphone[2].replace(/_/g, '.');
            device.iphone = true;
        }
        else if (ipad) {
            device.osVersion = ipad[2].replace(/_/g, '.');
            device.ipad = true;
        }
        else if (ipod) {
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
        var osVersionArr = device.osVersion.split('.');
        device.minimalUI = !device.webView
            && (ipad || iphone)
            && (osVersionArr[0] * 1 === 7) ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7
            && $('meta[name="viewport"]') && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
    }
    // Check for status bar and fullscreen app mode
    var windowWidth = window.outerWidth;
    var windowHeight = window.outerHeight;
    if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
        device.statusBar = true;
    }
    // Class: pixelRatio
    var classNames = [];
    classNames.push("pixel-ratio-" + Math.floor(device.pixelRatio));
    if (device.pixelRatio >= 2) {
        classNames.push('retina');
    }
    // Class: os
    if (device.os) {
        classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
        if (device.ios) {
            var major = parseInt(device.osVersion.split('.')[0], 10);
            for (var i = major - 1; i >= 6; i--) {
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
exports.default = device;
function currentDevice() {
    var _a = device(), ios = _a.ios, osVersion = _a.osVersion, isWeixin = _a.isWeixin, webView = _a.webView, pixelRatio = _a.pixelRatio, statusBar = _a.statusBar;
    return { ios: ios, osVersion: osVersion, isWeixin: isWeixin, webView: webView, pixelRatio: pixelRatio, statusBar: statusBar };
}
exports.currentDevice = currentDevice;
function isWeixin() {
    var ua = getUa();
    return /MicroMessenger/i.test(ua);
}
exports.isWeixin = isWeixin;
function isAndroid() {
    var ua = getUa();
    return !!getAndroid(ua);
}
exports.isAndroid = isAndroid;
function isIphone() {
    var ua = getUa();
    return !!getIphone(ua, getIpad(ua));
}
exports.isIphone = isIphone;
function isIOS() {
    var ua = getUa();
    var ipad = getIpad(ua);
    var ipod = getIpod(ua);
    var iphone = getIphone(ua, ipad);
    return !!(ipad || iphone || ipod);
}
exports.isIOS = isIOS;
