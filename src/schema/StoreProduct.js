// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import Store from './Store';
import StoreTag from './StoreTag';

export default class StoreProduct extends BaseObject {
  static spawn = (info) => {
    const object = new StoreProduct();

    StoreProduct.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('name', info.get('name'));
    object.set('description', info.get('description'));
    object.set('barcode', info.get('barcode'));
    object.set('productPageUrl', info.get('productPageUrl'));
    object.set('imageUrl', info.get('imageUrl'));
    object.set('size', info.get('size'));
    object.set('lastCrawlDateTime', info.get('lastCrawlDateTime'));

    if (info.has('storeTagIds')) {
      const storeTagIds = info.get('storeTagIds');

      if (storeTagIds.isEmpty()) {
        object.set('storeTags', []);
      } else {
        object.set('storeTags', storeTagIds.map(storeTagId => StoreTag.createWithoutData(storeTagId)).toArray());
      }
    } else if (info.has('storeTags')) {
      const storeTags = info.get('storeTags');

      if (storeTags.isEmpty()) {
        object.set('storeTags', []);
      } else {
        object.set('storeTags', storeTags.toArray());
      }
    }

    if (info.has('storeId')) {
      const storeId = info.get('storeId');

      if (storeId) {
        object.set('store', Store.createWithoutData(storeId));
      }
    } else if (info.has('store')) {
      const store = info.get('store');

      if (store) {
        object.set('store', store);
      }
    }
  };

  constructor(object) {
    super(object, 'StoreProduct');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    StoreProduct.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const storeTagObjects = this.getObject().get('storeTags');
    const storeTags = storeTagObjects ? Immutable.fromJS(storeTagObjects).map(storeTag => new StoreTag(storeTag).getInfo()) : undefined;
    const store = new Store(this.getObject().get('store'));

    return Map({
      id: this.getId(),
      name: this.getObject().get('name'),
      description: this.getObject().get('description'),
      barcode: this.getObject().get('barcode'),
      productPageUrl: this.getObject().get('productPageUrl'),
      imageUrl: this.getObject().get('imageUrl'),
      size: this.getObject().get('size'),
      lastCrawlDateTime: this.getObject().get('lastCrawlDateTime'),
      storeTags,
      storeTagIds: storeTags ? storeTags.map(storeTag => storeTag.get('id')) : List(),
      store: store.getInfo(),
      storeId: store.getId(),
    });
  };
}
