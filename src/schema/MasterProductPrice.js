// @flow

import Immutable, { Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import MasterProduct from './MasterProduct';
import Store from './Store';

export default class MasterProductPrice extends BaseObject {
  static spawn = (info) => {
    const object = new MasterProductPrice();

    MasterProductPrice.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
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

    const description = info.get('description');

    object.set('description', description ? description.toLowerCase() : undefined);

    const storeName = info.get('storeName');

    object.set('storeName', storeName ? storeName.toLowerCase() : undefined);

    object.set('priceDetails', info.get('priceDetails').toJS());
    object.set('capturedDate', info.get('capturedDate'));
  };

  constructor(object) {
    super(object, 'MasterProductPrice');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    MasterProductPrice.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const masterProduct = new MasterProduct(this.getObject().get('masterProduct'));
    const store = new Store(this.getObject().get('store'));

    return Map({
      id: this.getId(),
      masterProduct: masterProduct.getInfo(),
      masterProductId: masterProduct.getId(),
      description: this.getObject().get('description'),
      store: store.getInfo(),
      storeId: store.getId(),
      storeName: this.getObject().get('storeName'),
      priceDetails: Immutable.fromJS(this.getObject().get('priceDetails')),
      capturedDate: this.getObject().get('capturedDate'),
    });
  };
}
