// @flow

import { Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';

export default class Tag extends BaseObject {
  static spawn = (info) => {
    const object = new Tag();

    Tag.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('key', info.get('key'));

    const name = info.get('name');

    object.set('name', name);
    object.set('lowerCaseName', name ? name.toLowerCase() : undefined);

    object.set('weight', info.get('weight'));
  };

  constructor(object) {
    super(object, 'Tag');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    Tag.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () =>
    Map({
      id: this.getId(),
      key: this.getObject().get('key'),
      name: this.getObject().get('name'),
      weight: this.getObject().get('weight'),
    });
}
