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

    const description = info.get('description');

    object.set('description', description);
    object.set('lowerCaseDescription', description ? description.toLowerCase() : undefined);

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
      description: this.getObject().get('description'),
      weight: this.getObject().get('weight'),
    });
}
