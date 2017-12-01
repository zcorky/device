"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getUa_1 = require("./getUa");
var getAndroid_1 = require("./getAndroid");
var getIpad_1 = require("./getIpad");
var getIpod_1 = require("./getIpod");
var getIphone_1 = require("./getIphone");
var utils_1 = require("./utils");
function device() {
    var ua = getUa_1.default();
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
    var android = getAndroid_1.default();
    var ipad = getIpad_1.default();
    var ipod = getIpod_1.default();
    var iphone = getIphone_1.default();
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
            && utils_1.default('meta[name="viewport"]') && utils_1.default('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
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
    var ua = getUa_1.default();
    var _a = device(), os = _a.os, osVersion = _a.osVersion, isWeixin = _a.isWeixin, webView = _a.webView, pixelRatio = _a.pixelRatio, statusBar = _a.statusBar;
    return { os: os, osVersion: osVersion, isWeixin: isWeixin, webView: webView, pixelRatio: pixelRatio, statusBar: statusBar, ua: ua };
}
exports.currentDevice = currentDevice;
