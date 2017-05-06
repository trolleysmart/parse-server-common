import {
  Map,
} from 'immutable';
import {
  BaseObject,
} from 'micro-business-parse-server-common';

export default class Store extends BaseObject {
  static spawn = (info) => {
    const object = new Store();

    Store.updateInfoInternal(object, info);

    return object;
  }

  static updateInfoInternal = (object, info) => {
    object.set('name', info.get('name'));
  }

  constructor(object) {
    super(object, 'Store');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    Store.updateInfoInternal(object, info);

    return this;
  }

  getInfo = () => Map({
    id: this.getId(),
    name: this.getObject()
        .get('name'),
  })
}
