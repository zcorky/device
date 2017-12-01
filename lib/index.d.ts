export default function device(): {
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
export declare function currentDevice(): {
    os: any;
    osVersion: any;
    isWeixin: boolean;
    webView: boolean;
    pixelRatio: number;
    statusBar: boolean;
    ua: string;
};
