// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import Store from './Store';
import Tag from './Tag';
import StoreProduct from './StoreProduct';

export default class ProductPrice extends BaseObject {
  static spawn = (info) => {
    const object = new ProductPrice();

    ProductPrice.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('name', info.get('name'));
    object.set('description', info.get('description'));
    object.set('priceDetails', info.get('priceDetails').toJS());
    object.set('priceToDisplay', info.get('priceToDisplay'));
    object.set('saving', info.get('saving'));
    object.set('savingPercentage', info.get('savingPercentage'));
    object.set('offerEndDate', info.get('offerEndDate'));
    object.set('status', info.get('status'));
    object.set('special', info.get('special'));
    BaseObject.createPointer(object, info, 'store', Store);
    BaseObject.createArrayPointer(object, info, 'tag', Tag);
    BaseObject.createPointer(object, info, 'storeProduct', StoreProduct);
  };

  constructor(object) {
    super(object, 'ProductPrice');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    ProductPrice.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const store = new Store(this.getObject().get('store'));
    const tagObjects = this.getObject().get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;
    const storeProduct = new StoreProduct(this.getObject().get('storeProduct'));

    return Map({
      id: this.getId(),
      name: this.getObject().get('name'),
      description: this.getObject().get('description'),
      priceDetails: Immutable.fromJS(this.getObject().get('priceDetails')),
      priceToDisplay: this.getObject().get('priceToDisplay'),
      saving: this.getObject().get('saving'),
      savingPercentage: this.getObject().get('savingPercentage'),
      offerEndDate: this.getObject().get('offerEndDate'),
      status: this.getObject().get('status'),
      special: this.getObject().get('special'),
      store: store.getInfo(),
      storeId: store.getId(),
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
      storeProduct: storeProduct.getInfo(),
      storeProductId: storeProduct.getId(),
    });
  };
}
