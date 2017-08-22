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

    if (info.has('parentStoreId')) {
      const parentStoreId = info.get('parentStoreId');

      if (parentStoreId) {
        object.set('parentStore', Store.createWithoutData(parentStoreId));
      }
    } else if (info.has('parentStore')) {
      const parentStore = info.get('parentStore');

      if (parentStore) {
        object.set('parentStore', parentStore);
      }
    }
  };

  constructor(object) {
    super(object, 'Store');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    Store.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const parentStoreObject = this.getObject().get('parentStore');
    const parentStore = parentStoreObject ? new Store(parentStoreObject) : undefined;

    return Map({
      id: this.getId(),
      key: this.getObject().get('key'),
      name: this.getObject().get('name'),
      imageUrl: this.getObject().get('imageUrl'),
      address: this.getObject().get('address'),
      phones: Immutable.fromJS(this.getObject().get('phones')),
      geoLocation: this.getObject().get('geoLocation'),
      parentStore: parentStore ? parentStore.getInfo() : undefined,
      parentStoreId: parentStore ? parentStore.getId() : undefined,
    });
  };
}
