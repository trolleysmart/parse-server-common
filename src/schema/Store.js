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
    BaseObject.createPointer(object, info, 'parentStore', Store);
  };

  constructor(object) {
    super(object, 'Store');
  }

  updateInfo = (info) => {
    Store.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const parentStoreObject = object.get('parentStore');
    const parentStore = parentStoreObject ? new Store(parentStoreObject) : undefined;

    return Map({
      id: this.getId(),
      key: object.get('key'),
      name: object.get('name'),
      imageUrl: object.get('imageUrl'),
      address: object.get('address'),
      phones: Immutable.fromJS(object.get('phones')),
      geoLocation: object.get('geoLocation'),
      parentStore: parentStore ? parentStore.getInfo() : undefined,
      parentStoreId: parentStore ? parentStore.getId() : undefined,
    });
  };
}
