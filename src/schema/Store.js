// @flow

import Immutable, { Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';

export default class Store extends BaseObject {
  static spawn = (info) => {
    const object = new Store();

    Store.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('key', info.get('key'));
    object.set('name', info.get('name'));
    object.set('imageUrl', info.get('imageUrl'));
    object.set('address', info.get('address'));

    if (info.has('phones')) {
      const phones = info.get('phones');

      if (phones) {
        object.set('phones', phones.toJS());
      }
    }

    object.set('geoLocation', info.get('geoLocation'));
  };

  constructor(object) {
    super(object, 'Store');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    Store.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () =>
    Map({
      id: this.getId(),
      key: this.getObject().get('key'),
      name: this.getObject().get('name'),
      imageUrl: this.getObject().get('imageUrl'),
      address: this.getObject().get('address'),
      phones: Immutable.fromJS(this.getObject().get('phones')),
      geoLocation: this.getObject().get('geoLocation'),
    });
}
