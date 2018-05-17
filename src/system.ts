import os from './os';
import version from './version';

export default function system() {
  return {
    name: os(),
    version: version(),
  };
}