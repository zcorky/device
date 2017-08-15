declare function $(selector: any): any;
declare function getDeviceInfo(): {
    os: any;
    osVersion: any;
    webView: boolean;
    minimalUI: boolean;
    statusBar: boolean;
    ios: boolean;
    android: boolean;
    iphone: boolean;
    ipad: boolean;
    androidChrome: boolean;
    isWeixin: boolean;
    pixelRatio: number;
    classNames: any[];
};
