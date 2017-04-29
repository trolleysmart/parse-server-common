import Immutable, {
  Map,
} from 'immutable';
import {
  BaseObject,
  ParseWrapperService,
} from 'micro-business-parse-server-common';

class ShoppingList extends BaseObject {
  static spawn(info) {
    const object = new ShoppingList();

    ShoppingList.updateInfoInternal(object, info);

    return object;
  }

  static updateInfoInternal(object, info) {
    object.set('user', ParseWrapperService.createUserWithoutData(info.get('userId')));
    object.set('items', info.get('items')
      .toJS());
  }

  constructor(object) {
    super(object, 'ShoppingList');

    this.updateInfo = this.updateInfo.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  updateInfo(info) {
    const object = this.getObject();

    ShoppingList.updateInfoInternal(object, info);

    return this;
  }

  getInfo() {
    return Map({
      id: this.getId(),
      userId: this.getObject()
        .get('user')
        .id,
      items: Immutable.fromJS(this.getObject()
        .get('items')),
    });
  }
}

export {
  ShoppingList,
};

export default ShoppingList;
