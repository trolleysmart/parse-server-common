import {
  BaseObject,
} from 'micro-business-parse-server-common';

class Store extends BaseObject {
  constructor(object) {
    super(object, 'Store');

    this.getName = this.getName.bind(this);
  }

  static spawn(name) {
    const object = new Store();

    object.set('name', name);

    return object;
  }

  getName() {
    return this.getObject()
      .get('name');
  }
}

export {
  Store,
};

export default Store;
