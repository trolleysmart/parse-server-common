import Immutable, {
  Map,
} from 'immutable';

import {
  BaseObject,
  User,
} from 'micro-business-parse-server-common';

class ShoppingList extends BaseObject {
  static updateInfoInternal(object, info) {
    object.set('user', User.createWithoutData(info.get('userId')));
    object.set('items', info.get('items')
      .toJS());
  }

  constructor(object) {
    super(object, 'ShoppingList');

    this.updateInfo = this.updateInfo.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  static spawn(info) {
    const object = new ShoppingList();

    ShoppingList.updateInfoInternal(object, info);

    return object;
  }

  updateInfo(info) {
    const object = this.getObject();

    ShoppingList.updateInfoInternal(object, info);

    return this;
  }

  getInfo() {
    const user = new User(this.getObject()
      .get('user'));

    return Map({
      id: this.getId(),
      user,
      userId: user.getId(),
      items: Immutable.fromJS(this.getObject()
        .get('items')),
    });
  }
}

export {
  ShoppingList,
};

export default ShoppingList;
