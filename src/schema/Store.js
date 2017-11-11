// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';

export default class Store extends BaseObject {
  static spawn = (info) => {
    const object = new Store();

    Store.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('key', info.get('key'));
    BaseObject.createStringColumn(object, info, 'name');
    object.set('imageUrl', info.get('imageUrl'));
    object.set('address', info.get('address'));

    if (info.has('phones')) {
      const phones = info.get('phones');

      if (phones) {
        object.set('phones', phones.toJS());
      }
    }

    object.set('geoLocation', info.get('geoLocation'));
    object.set('openFrom', info.get('openFrom'));
    object.set('openUntil', info.get('openUntil'));
    object.set('forDisplay', info.get('forDisplay'));
    BaseObject.createPointer(object, info, 'parentStore', Store);
    BaseObject.createUserPointer(object, info, 'ownedByUser');
    BaseObject.createUserArrayPointer(object, info, 'maintainedByUser');
    object.set('status', info.get('status'));
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
    const ownedByUser = object.get('ownedByUser');
    const maintainedByUsers = Immutable.fromJS(object.get('maintainedByUsers'));

    return Map({
      id: this.getId(),
      key: object.get('key'),
      name: object.get('name'),
      imageUrl: object.get('imageUrl'),
      address: object.get('address'),
      phones: Immutable.fromJS(object.get('phones')),
      geoLocation: object.get('geoLocation'),
      openFrom: object.get('openFrom'),
      openUntil: object.get('openUntil'),
      forDisplay: object.get('forDisplay'),
      parentStore: parentStore ? parentStore.getInfo() : undefined,
      parentStoreId: parentStore ? parentStore.getId() : undefined,
      ownedByUser,
      ownedByUserId: ownedByUser ? ownedByUser.id : undefined,
      maintainedByUsers,
      maintainedByUserIds: maintainedByUsers ? maintainedByUsers.map(maintainedByUser => maintainedByUser.id) : List(),
      status: object.get('status'),
    });
  };
}
