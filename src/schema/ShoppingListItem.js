// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import ProductPrice from './ProductPrice';
import ShoppingList from './ShoppingList';
import StapleItem from './StapleItem';
import Store from './Store';
import Tag from './Tag';

export default class ShoppingListItem extends BaseObject {
  static spawn = (info) => {
    const object = new ShoppingListItem();

    ShoppingListItem.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('name', info.get('name'));
    object.set('description', info.get('description'));
    object.set('imageUrl', info.get('imageUrl'));
    object.set('isPurchased', info.get('isPurchased'));
    BaseObject.createUserPointer(object, info, 'addedByUser');
    BaseObject.createUserPointer(object, info, 'removedByUser');
    BaseObject.createPointer(object, info, 'shoppingList', ShoppingList);
    BaseObject.createPointer(object, info, 'productPrice', ProductPrice);
    BaseObject.createPointer(object, info, 'stapleItem', StapleItem);
    BaseObject.createPointer(object, info, 'store', Store);
    BaseObject.createArrayPointer(object, info, 'tag', Tag);
  };

  constructor(object) {
    super(object, 'ShoppingListItem');
  }

  updateInfo = (info) => {
    ShoppingListItem.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const addedByUser = object.get('addedByUser');
    const removedByUser = object.get('removedByUser');
    const shoppingList = new ShoppingList(object.get('shoppingList'));
    const productPriceObject = object.get('productPrice');
    const productPrice = productPriceObject ? new ProductPrice(productPriceObject) : undefined;
    const stapleItemObject = object.get('stapleItem');
    const stapleItem = stapleItemObject ? new StapleItem(stapleItemObject) : undefined;
    const tagObjects = object.get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;
    const storeObject = object.get('store');
    const store = storeObject ? new Store(storeObject) : undefined;

    return Map({
      id: this.getId(),
      name: object.get('name'),
      description: object.get('description'),
      imageUrl: object.get('imageUrl'),
      isPurchased: object.get('isPurchased'),
      addedByUser,
      addedByUserId: addedByUser ? addedByUser.id : undefined,
      removedByUser,
      removedByUserId: removedByUser ? removedByUser.id : undefined,
      shoppingList: shoppingList.getInfo(),
      shoppingListId: shoppingList.getId(),
      productPrice: productPrice ? productPrice.getInfo() : undefined,
      productPriceId: productPrice ? productPrice.getId() : undefined,
      stapleItem: stapleItem ? stapleItem.getInfo() : undefined,
      stapleItemId: stapleItem ? stapleItem.getId() : undefined,
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
      store: store ? store.getInfo() : undefined,
      storeId: store ? store.getId() : undefined,
    });
  };
}
