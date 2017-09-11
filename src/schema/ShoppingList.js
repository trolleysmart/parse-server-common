// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';

export default class ShoppingList extends BaseObject {
  static spawn = (info) => {
    const object = new ShoppingList();

    ShoppingList.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('name', info.get('name'));
    BaseObject.createUserPointer(object, info, 'user');
    BaseObject.createUserArrayPointer(object, info, 'sharedWithUser');
  };

  constructor(object) {
    super(object, 'ShoppingList');
  }

  updateInfo = (info) => {
    ShoppingList.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const user = object.get('user');
    const sharedWithUsers = Immutable.fromJS(object.get('sharedWithUsers'));

    return Map({
      id: this.getId(),
      name: object.get('name'),
      user,
      userId: user ? user.id : undefined,
      sharedWithUsers,
      sharedWithUserIds: sharedWithUsers ? sharedWithUsers.map(sharedWithUser => sharedWithUser.id) : List(),
    });
  };
}
