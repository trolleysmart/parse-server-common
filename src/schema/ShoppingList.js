// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from '@microbusiness/parse-server-common';

export default class ShoppingList extends BaseObject {
  static spawn = (info) => {
    const object = new ShoppingList();

    ShoppingList.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    BaseObject.createStringColumn(object, info, 'name');
    BaseObject.createUserPointer(object, info, 'user');
    BaseObject.createUserArrayPointer(object, info, 'sharedWithUser');
    object.set('status', info.get('status'));
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
      status: object.get('status'),
    });
  };
}
