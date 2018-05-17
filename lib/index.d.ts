export default function device(): {
    system: {
        name: string;
        version: any;
    };
    browser: {
        name: string;
        version: string;
    };
    isWeixin: boolean;
    isWebView: boolean;
    pixelRatio: number;
    size: {
        screenWidth: number;
        screenHeight: number;
        outerWidth: number;
        outerHeight: number;
        width: any;
        height: any;
    };
    fingerprint: any;
};
