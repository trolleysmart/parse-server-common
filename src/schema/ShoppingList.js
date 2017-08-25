// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject, ParseWrapperService } from 'micro-business-parse-server-common';

export default class ShoppingList extends BaseObject {
  static spawn = (info) => {
    const object = new ShoppingList();

    ShoppingList.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('name', info.get('name'));

    if (info.has('userId')) {
      const userId = info.get('userId');

      if (userId) {
        object.set('user', ParseWrapperService.createUserWithoutData(userId));
      }
    } else if (info.has('user')) {
      const user = info.get('user');

      if (user) {
        object.set('user', user);
      }
    }

    if (info.has('sharedWithUserIds')) {
      const sharedWithUserIds = info.get('sharedWithUserIds');

      if (sharedWithUserIds.isEmpty()) {
        object.set('sharedWithUsers', []);
      } else {
        object.set(
          'sharedWithUsers',
          sharedWithUserIds.map(sharedWithUserId => ParseWrapperService.createUserWithoutData(sharedWithUserId)).toArray(),
        );
      }
    } else if (info.has('sharedWithUsers')) {
      const sharedWithUsers = info.get('sharedWithUsers');

      if (sharedWithUsers.isEmpty()) {
        object.set('sharedWithUsers', []);
      } else {
        object.set('sharedWithUsers', sharedWithUsers.toArray());
      }
    }
  };

  constructor(object) {
    super(object, 'ShoppingList');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    ShoppingList.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const user = this.getObject().get('user');
    const sharedWithUsers = Immutable.fromJS(this.getObject().get('sharedWithUsers'));

    return Map({
      id: this.getId(),
      name: this.getObject().get('name'),
      user,
      userId: user ? user.id : undefined,
      sharedWithUsers,
      sharedWithUserIds: sharedWithUsers ? sharedWithUsers.map(sharedWithUser => sharedWithUser.id) : List(),
    });
  };
}
