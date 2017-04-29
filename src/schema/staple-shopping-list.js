import {
  Map,
} from 'immutable';
import {
  BaseObject,
  ParseWrapperService,
} from 'micro-business-parse-server-common';

class StapleShoppingList extends BaseObject {
  static spawn(info) {
    const object = new StapleShoppingList();

    StapleShoppingList.updateInfoInternal(object, info);

    return object;
  }

  static updateInfoInternal(object, info) {
    object.set('user', ParseWrapperService.createUserWithoutData(info.get('userId')));
    object.set('description', info.get('description'));
  }

  constructor(object) {
    super(object, 'StapleShoppingList');

    this.updateInfo = this.updateInfo.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  updateInfo(info) {
    const object = this.getObject();

    StapleShoppingList.updateInfoInternal(object, info);

    return this;
  }

  getInfo() {
    return Map({
      id: this.getId(),
      userId: this.getObject()
        .get('user')
        .id,
      description: this.getObject()
        .get('description'),
    });
  }
}

export {
  StapleShoppingList,
};

export default StapleShoppingList;
