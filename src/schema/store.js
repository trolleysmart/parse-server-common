import {
  Map,
} from 'immutable';
import {
  BaseObject,
} from 'micro-business-parse-server-common';

class Store extends BaseObject {
  static updateInfoInternal(object, info) {
    object.set('name', info.get('name'));
  }

  constructor(object) {
    super(object, 'Store');

    this.updateInfo = this.updateInfo.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  static spawn(info) {
    const object = new Store();

    Store.updateInfoInternal(object, info);

    return object;
  }

  updateInfo(info) {
    const object = this.getObject();

    Store.updateInfoInternal(object, info);

    return this;
  }

  getInfo() {
    return Map({
      id: this.getId(),
      name: this.getObject()
        .get('name'),
    });
  }
}

export {
  Store,
};

export default Store;
