import { toObject, fromObject } from 'errio';
import { addDataType } from './serializer';

class SerializableError {
  constructor(public error, public options: any = {}) {}
  toJSON = () => toObject(this.error, { stack: this.options.stack !== false });
  static fromJSON = obj => fromObject(obj);
}

class SerializableRegExp {
  constructor(public regexp, public options) {}
  toJSON() {
    const { source, flags, lastIndex } = this.regexp;
    return { source, flags, lastIndex };
  }
  static fromJSON({ source, flags, lastIndex }) {
    const regexp = new RegExp(source, flags);
    regexp.lastIndex = lastIndex;
    return regexp;
  }
}

addDataType(SerializableError, Error);
addDataType(SerializableRegExp, RegExp);
