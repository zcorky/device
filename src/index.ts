import { NetworkInterfaceInfo } from 'os';
import Fingerprint from './component/fingerprint';
const window = require('global');

// for compatible start
interface GeolocationCoordinates {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
}

interface GeolocationPosition {
  readonly coords: GeolocationCoordinates;
  readonly timestamp: number;
}

export type Position = GeolocationPosition;
// for compatible end

export interface IDevice {
  //
  userAgent(): string;
  //
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
  isiPhone(): boolean;
  isiPad(): boolean;
  // functions
  isOnline(): boolean;
  language(): string;
  getGeolocation(): Promise<Position>;
  getConnection(): Promise<IConnection>;
  getBattery(): Promise<IBattery>;
  getClipboard(): Promise<IClipboard | undefined>;
  getUserMedia(options?: MediaStreamConstraints): Promise<MediaStream>;
}

export interface IConnection {
  /**
   * 网络下行速度
   */
  readonly downlink: number;

  /**
   * 网络类型
   */
  readonly effectiveType: '4g';

  /**
   * 有值代表网络状态变更
   */
  onchange: null | Function;

  /**
   * 打开请求数据保护模式
   */
  readonly saveData: boolean;
}

export interface IBattery {
  /**
   * 是否正在充电
   */
  readonly charging: boolean;

  /**
   * 距离充电完毕还需要多长时间，如果为0则充电完毕
   *  单位秒
   */
  readonly chargingTime: number;

  /**
   * 电池剩余使用时间，单位秒
   */
  readonly dischargingTime: number;

  /**
   * 代表电量百分比, 值为 0.0 - 1.0
   */
  readonly level: number;

  onchargingchange: null | Function;

  onchargingtimechange: null | Function;

  ondischaringtimechange: null | Function;

  onlevelchange: null | Function;
}

export interface IClipboard {
  readText(): Promise<string>;
  writeText(text: string): Promise<void>;
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

let  _current: IDevice | null = null;

export class Device implements IDevice {
  public static getCurrent() {
    if (!_current) {
      _current = new Device(window?.navigator?.userAgent);
    }

    return _current;
  }

  public static parse(ua: string) {
    return new Device(ua);
  }
  
  constructor(private ua: string = window?.navigator?.userAgent) {}

  public userAgent() {
    return this.ua;
  }

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
    return window?.navigator?.platform;
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

  public isiPhone(): boolean {
    return this.is(/iPhone/i);
  }

  public isiPad(): boolean {
    return this.is(/iPad/i);
  }

  //
  public isOnline(): boolean {
    return !!window?.navigator?.onLine;
  }

  public language(): string {
    return window?.navigator?.language;
  }

  public async getGeolocation(): Promise<Position> {
    return new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  public async getConnection(): Promise<IConnection> {
    return window.navigator?.connection || {};
  }

  public async getBattery(): Promise<IBattery> {
    return window.navigator?.getBattery?.();
  }

  public async getClipboard(): Promise<IClipboard> {
    return window.navigator?.clipboard;
  }

  public async getUserMedia(options: MediaStreamConstraints = { audio: true, video: true }): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia(options);
  }

  public windowSize() {
    return {
      screenWidth: window?.screen?.width ?? -1,
      screenHeight: window?.screen?.height ?? -1,
      outerWidth: window?.outerWidth,
      outerHeight: window?.outerHeight,
      width: window?.innerWidth || window?.document?.documentElement?.width,
      height: window?.innerHeight || window?.document?.documentElement?.height,
    };
  }

  public devicePixelRatio() {
    return window?.devicePixelRatio ?? 1;
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
    } else if (this.isiPad()) {
      const v = this.v(/iPad.*OS\s([\d_]+)/i);
      return v && v.replace(/_/g, '.');
    } else if (this.isiOS()) {
      const v = this.v(/iPhone\sOS\s([\d_]+)/i);
      return v && v.replace(/_/g, '.');
    } else if (this.isMac()) {
      const v = this.v(/Mac\sOS\sX\s((\d+_\d+_\d+)|(\d+\.\d+))/i);
      return v && v.replace(/_/g, '.');
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
