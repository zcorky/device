import { getNativeAppRegExp } from './_internal';
import getUa from './getUa';

export default function isNativeApp() {
  const ua = getUa();
  const NATIVE_APP_REG_EXP = getNativeAppRegExp();
  const _ = new RegExp(NATIVE_APP_REG_EXP, 'i').exec(ua);

  return _ ? _[1] : null;
}
