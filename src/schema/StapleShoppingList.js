// @flow

import { Map } from 'immutable';
import { BaseObject, ParseWrapperService } from 'micro-business-parse-server-common';

export default class StapleShoppingList extends BaseObject {
  static spawn = info => {
    const object = new StapleShoppingList();

    StapleShoppingList.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('user', ParseWrapperService.createUserWithoutData(info.get('userId')));
    object.set('description', info.get('description'));
  };

  constructor(object) {
    super(object, 'StapleShoppingList');
  }

  updateInfo = info => {
    const object = this.getObject();

    StapleShoppingList.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () =>
    Map({
      id: this.getId(),
      userId: this.getObject().get('user').id,
      description: this.getObject().get('description'),
    });
}
