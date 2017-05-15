import Immutable, {
  Map,
} from 'immutable';
import {
  BaseObject,
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import StapleShoppingList from './staple-shopping-list';
import MasterProductPrice from './master-product-price';

export default class ShoppingList extends BaseObject {
  static spawn = (info) => {
    const object = new ShoppingList();

    ShoppingList.updateInfoInternal(object, info);

    return object;
  }

  static updateInfoInternal = (object, info) => {
    object.set('user', ParseWrapperService.createUserWithoutData(info.get('userId')));

    if (info.has('stapleShoppingListIds')) {
      const stapleShoppingListIds = info.get('stapleShoppingListIds');

      if (!stapleShoppingListIds.isEmpty()) {
        object.set('stapleShoppingList', stapleShoppingListIds.map(stapleShoppingListId => StapleShoppingList.createWithoutData(
            stapleShoppingListId))
          .toArray());
      }
    } else if (info.has('stapleShoppingList')) {
      const stapleShoppingList = info.get('stapleShoppingList');

      if (!stapleShoppingList.isEmpty()) {
        object.set('stapleShoppingList', stapleShoppingList.toArray());
      }
    }

    if (info.has('masterProductPriceIds')) {
      const masterProductPriceIds = info.get('masterProductPriceIds');

      if (!masterProductPriceIds.isEmpty()) {
        object.set('masterProductPrices', masterProductPriceIds.map(masterProductPriceId => MasterProductPrice.createWithoutData(
            masterProductPriceId))
          .toArray());
      }
    } else if (info.has('masterProductPrices')) {
      const masterProductPrices = info.get('masterProductPrices');

      if (!masterProductPrices.isEmpty()) {
        object.set('masterProductPrices', masterProductPrices.toArray());
      }
    }
  }

  constructor(object) {
    super(object, 'ShoppingList');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    ShoppingList.updateInfoInternal(object, info);

    return this;
  }

  getInfo = () => Map({
    id: this.getId(),
    userId: this.getObject()
      .get('user')
      .id,
    items: Immutable.fromJS(this.getObject()
      .get('items')),
  })
}
