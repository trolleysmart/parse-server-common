// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import MasterProduct from './MasterProduct';
import Store from './Store';
import StoreTag from './StoreTag';

export default class StoreMasterProduct extends BaseObject {
  static spawn = (info) => {
    const object = new StoreMasterProduct();

    StoreMasterProduct.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('description', info.get('description'));
    object.set('lowerCaseDescription', info.get('description').toLowerCase());
    object.set('barcode', info.get('barcode'));
    object.set('imageUrl', info.get('imageUrl'));

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

    if (info.has('masterProductId')) {
      const masterProductId = info.get('masterProductId');

      if (masterProductId) {
        object.set('masterProduct', MasterProduct.createWithoutData(masterProductId));
      }
    } else if (info.has('masterProduct')) {
      const masterProduct = info.get('masterProduct');

      if (masterProduct) {
        object.set('masterProduct', masterProduct);
      }
    }
  };

  constructor(object) {
    super(object, 'StoreMasterProduct');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    StoreMasterProduct.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const storeTagObjects = this.getObject().get('storeTags');
    const storeTags = storeTagObjects ? Immutable.fromJS(storeTagObjects).map(storeTag => new StoreTag(storeTag).getInfo()) : undefined;
    const storeObject = this.getObject().get('store');
    const store = storeObject ? new Store(storeObject).getInfo() : undefined;
    const masterProductObject = this.getObject().get('masterProduct');
    const masterProduct = masterProductObject ? new MasterProduct(masterProductObject).getInfo() : undefined;

    return Map({
      id: this.getId(),
      description: this.getObject().get('description'),
      barcode: this.getObject().get('barcode'),
      imageUrl: this.getObject().get('imageUrl'),
      storeTags,
      storeTagIds: storeTags ? storeTags.map(storeTag => storeTag.get('id')) : List(),
      store,
      storeId: store ? store.get('id') : undefined,
      masterProduct,
      masterProductId: masterProduct ? masterProduct.get('id') : undefined,
    });
  };
}