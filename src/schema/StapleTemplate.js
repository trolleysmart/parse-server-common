// @flow

import { Map } from 'immutable';
import { BaseObject } from '@microbusiness/parse-server-common';

export default class StapleTemplate extends BaseObject {
  static spawn = (info) => {
    const object = new StapleTemplate();

    StapleTemplate.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    BaseObject.createStringColumn(object, info, 'name');
    BaseObject.createStringColumn(object, info, 'description');
    object.set('imageUrl', info.get('imageUrl'));
  };

  constructor(object) {
    super(object, 'StapleTemplate');
  }

  updateInfo = (info) => {
    StapleTemplate.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();

    return Map({
      id: this.getId(),
      name: object.get('name'),
      description: object.get('description'),
      imageUrl: object.get('imageUrl'),
    });
  };
}
