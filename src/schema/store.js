import {
  Map,
} from 'immutable';
import {
  BaseObject,
} from 'micro-business-parse-server-common';

class Store extends BaseObject {
  constructor(object) {
    super(object, 'Store');

    this.updateInfo = this.updateInfo.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  static spawn(info) {
    const object = new Store();

    object.set('name', info.get('name'));

    return object;
  }

  updateInfo(info) {
    const object = this.getObject();

    object.set('name', info.get('name'));

    return object;
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
