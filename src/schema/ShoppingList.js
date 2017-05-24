// @flow

import { Map } from 'immutable';
import { BaseObject, ParseWrapperService } from 'micro-business-parse-server-common';
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
    object.set('doneDate', info.get('doneDate'));

    if (info.has('stapleShoppingListId')) {
      const stapleShoppingListId = info.get('stapleShoppingListId');

      object.set('stapleShoppingList', StapleShoppingList.createWithoutData(stapleShoppingListId));
    } else if (info.has('stapleShoppingList')) {
      const stapleShoppingList = info.get('stapleShoppingList');

      object.set('stapleShoppingList', stapleShoppingList);
    }

    if (info.has('masterProductPriceId')) {
      const masterProductPriceId = info.get('masterProductPriceId');

      object.set('masterProductPrice', MasterProductPrice.createWithoutData(masterProductPriceId));
    } else if (info.has('masterProductPrice')) {
      const masterProductPrice = info.get('masterProductPrice');

      object.set('masterProductPrice', masterProductPrice);
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
    const stapleShoppingListObject = this.getObject().get('stapleShoppingList');
    const stapleShoppingList = stapleShoppingListObject ? new StapleShoppingList(stapleShoppingListObject).getInfo() : undefined;
    const masterProductPriceObject = this.getObject().get('masterProductPrice');
    const masterProductPrice = masterProductPriceObject ? new MasterProductPrice(masterProductPriceObject).getInfo() : undefined;

    let info = Map({
      id: this.getId(),
      userId: user ? user.id : undefined,
      doneDate: this.getObject().get('doneDate'),
      stapleShoppingList,
      stapleShoppingListId: stapleShoppingList ? stapleShoppingList.get('id') : undefined,
      masterProductPrice,
      masterProductPriceId: masterProductPrice ? masterProductPrice.get('id') : undefined,
    });

    if (stapleShoppingList) {
      info = info.merge(
        Map({
          stapleShoppingList,
          stapleShoppingListId: stapleShoppingList ? stapleShoppingList.get('id') : undefined,
        }),
      );
    }

    if (masterProductPrice) {
      info = info.merge(
        Map({
          masterProductPrice,
          masterProductPriceId: masterProductPrice ? masterProductPrice.get('id') : undefined,
        }),
      );
    }

    return info;
  };
}
