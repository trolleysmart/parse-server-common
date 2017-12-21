// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from '@microbusiness/parse-server-common';
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
    BaseObject.createStringColumn(object, info, 'name');
    BaseObject.createStringColumn(object, info, 'description');
    object.set('priceDetails', info.get('priceDetails').toJS());
    object.set('priceToDisplay', info.get('priceToDisplay'));
    object.set('saving', info.get('saving'));
    object.set('savingPercentage', info.get('savingPercentage'));
    object.set('offerEndDate', info.get('offerEndDate'));
    object.set('status', info.get('status'));
    object.set('special', info.get('special'));
    object.set('barcode', info.get('barcode'));
    object.set('size', info.get('size'));
    object.set('imageUrl', info.get('imageUrl'));
    object.set('productPageUrl', info.get('productPageUrl'));
    BaseObject.createPointer(object, info, 'store', Store);
    BaseObject.createArrayPointer(object, info, 'tag', Tag);
    BaseObject.createPointer(object, info, 'storeProduct', StoreProduct);
    object.set('createdByCrawler', info.get('createdByCrawler'));
    object.set('authorizedToDisplay', info.get('authorizedToDisplay'));
  };

  constructor(object) {
    super(object, 'ProductPrice');
  }

  updateInfo = (info) => {
    ProductPrice.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const store = new Store(object.get('store'));
    const tagObjects = object.get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;
    const storeProduct = new StoreProduct(object.get('storeProduct'));

    return Map({
      id: this.getId(),
      name: object.get('name'),
      description: object.get('description'),
      priceDetails: Immutable.fromJS(object.get('priceDetails')),
      priceToDisplay: object.get('priceToDisplay'),
      saving: object.get('saving'),
      savingPercentage: object.get('savingPercentage'),
      offerEndDate: object.get('offerEndDate'),
      status: object.get('status'),
      special: object.get('special'),
      barcode: object.get('barcode'),
      size: object.get('size'),
      imageUrl: object.get('imageUrl'),
      productPageUrl: object.get('productPageUrl'),
      store: store.getInfo(),
      storeId: store.getId(),
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
      storeProduct: storeProduct.getInfo(),
      storeProductId: storeProduct.getId(),
      createdByCrawler: object.get('createdByCrawler'),
      authorizedToDisplay: object.get('authorizedToDisplay'),
    });
  };
}
