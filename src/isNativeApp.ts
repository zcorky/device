import { getNativeAppRegExp, setNativeAppRegExp } from './_internal';
import getUa from './getUa';

export default function isNativeApp() {
  const ua = getUa();
  const NATIVE_APP_REG_EXP = getNativeAppRegExp();
  return !!NATIVE_APP_REG_EXP && new RegExp(NATIVE_APP_REG_EXP, 'i').test(ua);
}

export {
  setNativeAppRegExp,
};