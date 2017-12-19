import { getNativeAppRegExp } from './_internal';
import getUa from './getUa';

export default function isNativeApp(): { app: string, appVersion: string } {
  const ua = getUa();
  const NATIVE_APP_REG_EXP = getNativeAppRegExp();
  const _ = new RegExp(NATIVE_APP_REG_EXP, 'i').exec(ua);

  return _ ? {
    app: _[1],
    appVersion: _[2],
  } : {
    app: null,
    appVersion: null,
  };
}
