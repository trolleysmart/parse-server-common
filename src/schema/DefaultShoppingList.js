// @flow

import { Map } from 'immutable';
import { BaseObject } from '@microbusiness/parse-server-common';
import ShoppingList from './ShoppingList';

export default class DefaultShoppingList extends BaseObject {
  static spawn = (info) => {
    const object = new DefaultShoppingList();

    DefaultShoppingList.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    BaseObject.createUserPointer(object, info, 'user');
    BaseObject.createPointer(object, info, 'shoppingList', ShoppingList);
  };

  constructor(object) {
    super(object, 'DefaultShoppingList');
  }

  updateInfo = (info) => {
    DefaultShoppingList.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const user = object.get('user');
    const shoppingList = new ShoppingList(object.get('shoppingList'));

    return Map({
      id: this.getId(),
      user,
      userId: user ? user.id : undefined,
      shoppingList: shoppingList.getInfo(),
      shoppingListId: shoppingList.getId(),
    });
  };
}
