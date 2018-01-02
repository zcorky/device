// import fetch from 'unfetch';
import Fingerprint from './fingerprint';
import ua from "./getUa";
import app from './getAppType';
import windowSize from './getWindowSize';
import devicePixelRadio from './getDevicePixelRadio';

export default function info() {
  return {
    uid: new Fingerprint(undefined).get(),
    ua: ua(),
    windowSize: windowSize(),
    app: app(),
    devicePixelRadio: devicePixelRadio(),
    //
    language: window.navigator && window.navigator.language,
    url: window.location.href,
    referrer: window.document.referrer,
    geolocation: window.navigator && window.navigator.geolocation,
    appName: window.navigator && window.navigator.appName,
    appVersion: window.navigator && window.navigator.appVersion,
    appCodeName: window.navigator && window.navigator.appCodeName,
    vendor: window.navigator && window.navigator.vendor,
    maxTouchPoints: window.navigator && window.navigator.maxTouchPoints,
    deviceMemory: window.navigator && (window.navigator as any).deviceMemory,
    userMedia: window.navigator && !!(navigator.getUserMedia || (navigator as any).webkitGetUserMedia || (navigator as any).mozGetUserMedia),
    //
    platform: window.navigator && window.navigator.platform,
    sessionStorage: !!window.sessionStorage,
    localStorage: !!window.localStorage,
    indexedDB: !!window.indexedDB,
    openDatabase: !!(window as any).openDatabase,
    cookieEnabled: window.navigator && window.navigator.cookieEnabled,
  };
}