import Fingerprint from './component/fingerprint';
const window = require('global');

export interface IDevice {
  os(): IOS;
  browser(): IBrowser;
  platform(): IPlatform;
  windowSize(): IWindowSize;
  devicePixelRatio(): number;
  fingerprint(): string;
  // is
  // is::os
  isWindows(): boolean;
  isMac(): boolean;
  isLinux(): boolean;
  // os:platform
  isAndroid(): boolean;
  isiOS(): boolean;
  // is::browser
  isChrome(): boolean;
  isFirefox(): boolean;
  isSafari(): boolean;
  isIE(): boolean;
  isQQBrowser(): boolean;
  // is::app
  isWeixin(): boolean;
  isQQ(): boolean;
  isWeibo(): boolean;
  //
  isWebview(): boolean;
  isMobile(): boolean;
  //
  isOnline(): boolean;
}

export interface IOS {
  name: string;
  version: string;
}

export interface IBrowser {
  name: string;
  version: string;
}

export type IPlatform = string;

export interface IWindowSize {
  width: number;
  height: number;
}

export class Device implements IDevice {
  
  constructor(private ua: string = window.navigator?.userAgent) {}

  public os(): IOS {
    return {
      name: this.osName(),
      version: this.osVersion(),
    };
  }

  public browser(): IBrowser {
    return {
      name: this.browserName(),
      version: this.browserVersion(),
    };
  }

  public platform() {
    return window.navigator?.platform;
  }

  public isWindows(): boolean {
    return this.is(/windows/i);
  }

  public isMac(): boolean {
    return this.is(/macintosh/i);
  }

  public isLinux(): boolean {
    return this.is(/linux/i);
  }

  // os:platform
  public isAndroid(): boolean {
    return this.is(/Android/i);
  }

  public isiOS(): boolean {
    return this.is(/iPhone|iPad|iPod/i);
  }

  // is::browser
  public isChrome(): boolean {
    return this.is(/chrome/i);
  }

  public isFirefox(): boolean {
    return this.is(/firefox/i);
  }

  public isSafari(): boolean {
    return this.is(/Safari\/([\d\.]+)/i);
  }

  public isIE(): boolean {
    return this.is(/msie (\d+\.\d+)/i);
  }

  public isQQBrowser(): boolean {
    return this.is(/MQQBrowser/i);
  }

  // is::app
  public isWeixin(): boolean {
    return this.is(/MicroMessenger/i);
  }

  public isQQ(): boolean {
    return this.is(/\ QQ\//i);
  }

  public isWeibo(): boolean {
    return this.is(/Weibo/i);
  }

  //
  public isWebview(): boolean {
    return !this.isiOS() && !!this.is(/.*AppleWebKit(?!.*Safari)/i);
  }

  public isMobile(): boolean {
    return this.is(/mobile/i);
  }

  //
  public isOnline(): boolean {
    return !!window.navigator?.onLine;
  }

  public windowSize() {
    return {
      screenWidth: window.screen?.width ?? -1,
      screenHeight: window.screen?.height ?? -1,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      width: window.innerWidth || window.document?.documentElement?.width,
      height: window.innerHeight || window.document?.documentElement?.height,
    };
  }

  public devicePixelRatio() {
    return window.devicePixelRatio ?? 1;
  }

  public fingerprint() {
    return new Fingerprint(undefined).get();
  }

  //
  private osName() {
    if (this.isAndroid()) {
      return 'Android';
    } else if (this.isiOS()) {
      return 'iOS';
    } else if (this.isMac()) {
      return 'MacOS';
    } else if (this.isWindows()) {
      return 'Windows';
    } else if (this.isLinux()) {
      return 'Linux';
    } else {
      return '';
    }
  }

  //
  private osVersion() {
    if (this.isAndroid()) {
      return this.v(/Android\s(\d+\.\d+)/i);
    } else if (this.isiOS()) {
      return this.v(/iPhone\sOS\s([\d_]+)|iPad.*OS\s([\d_]+)/i);
    } else if (this.isMac()) {
      return this.v( /Mac\sOS\sX\s((\d+_\d+_\d+)|(\d+\.\d+))/i);
    } else if (this.isWindows()) {
      return this.v(/windows\snt\s([\d\.]+)/i);
    } else if (this.isLinux()) {
      return '';
    } else {
      return '';
    }
  }

  //
  private browserName() {
    if (this.isChrome()) {
      return 'Chrome';
    } else if (this.isFirefox()) {
      return 'Firefox';
    }  else if (this.isSafari()) {
      return 'Safari';
    } else if (this.isIE()) {
      return 'IE';
    } else if (this.isQQBrowser()) {
      return 'QQBrowser';
    } else {
      return 'unknown';
    }
  }

  //
  private browserVersion() {
    if (this.isChrome()) {
      return this.v(/chrome\/(\d+\.\d+\.\d+\.\d+)/i);
    } else if (this.isFirefox()) {
      return this.v(/firefox\/(\d+\.\d+)/i);
    } else if (this.isSafari()) {
      return this.v(/Safari\/([\d\.]+)/i);
    } else if (this.isIE()) {
      return this.v(/MSIE ([0-9]{1,}[\.0-9]{0,})/i);
    } else if (this.isQQBrowser()) {
      return this.v(/\ MQQBrowser\/([^\s]+)/i);
    } else {
      return 'unknown';
    }
  }

  private is(regex: RegExp) {
    return regex.test(this.ua);
  }

  private v(regex: RegExp) {
    return regex.exec(this.ua)?.[1] ?? '';
  }
}

export default Device;
