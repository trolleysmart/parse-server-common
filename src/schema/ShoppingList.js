// @flow

import Immutable, {
  Map,
  List,
} from 'immutable';
import {
  BaseObject,
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import StapleShoppingList from './StapleShoppingList';
import MasterProductPrice from './MasterProductPrice';

export default class ShoppingList extends BaseObject {
  static spawn = (info) => {
    const object = new ShoppingList();

    ShoppingList.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('user', ParseWrapperService.createUserWithoutData(info.get('userId')));

    if (info.has('stapleShoppingListIds')) {
      const stapleShoppingListIds = info.get('stapleShoppingListIds');

      if (!stapleShoppingListIds.isEmpty()) {
        object.set(
          'stapleShoppingList',
          stapleShoppingListIds.map(stapleShoppingListId => StapleShoppingList.createWithoutData(stapleShoppingListId))
          .toArray(),
        );
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
        object.set(
          'masterProductPrices',
          masterProductPriceIds.map(masterProductPriceId => MasterProductPrice.createWithoutData(masterProductPriceId))
          .toArray(),
        );
      }
    } else if (info.has('masterProductPrices')) {
      const masterProductPrices = info.get('masterProductPrices');

      if (!masterProductPrices.isEmpty()) {
        object.set('masterProductPrices', masterProductPrices.toArray());
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
    const masterProductPricesObjects = this.getObject()
      .get('masterProductPrices');
    const masterProductPrices = masterProductPricesObjects ?
      Immutable.fromJS(masterProductPricesObjects)
      .map(masterProductPrice => new MasterProductPrice(masterProductPrice)
        .getInfo()) :
      undefined;

    const stapleShoppingListObjects = this.getObject()
      .get('stapleShoppingList');
    const stapleShoppingList = stapleShoppingListObjects ?
      Immutable.fromJS(stapleShoppingListObjects)
      .map(stapleShoppingListItem => new StapleShoppingList(stapleShoppingListItem)
        .getInfo()) :
      undefined;

    return Map({
      id: this.getId(),
      userId: this.getObject()
        .get('user')
        .id,
      masterProductPrices,
      masterProductPriceIds: masterProductPrices ? masterProductPrices.map(masterProductPrice => masterProductPrice.get('id')) : List(),
      stapleShoppingList,
      stapleShoppingListIds: stapleShoppingList ? stapleShoppingList.map(stapleShoppingListItem => stapleShoppingListItem.get('id')) : List(),
    });
  }

}
