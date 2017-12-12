export let NATIVE_APP_REG_EXP: string = null;

export function setNativeAppRegExp(reg: string) {
  NATIVE_APP_REG_EXP = reg;
}

export function getNativeAppRegExp() {
  return NATIVE_APP_REG_EXP;
}
