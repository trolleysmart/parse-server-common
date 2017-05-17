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
    object.set('masterProduct', MasterProduct.createWithoutData(info.get('masterProductId')));
    object.set('store', Store.createWithoutData(info.get('storeId')));
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
      store: store.getInfo(),
      storeId: store.getId(),
      priceDetails: Immutable.fromJS(this.getObject().get('priceDetails')),
      capturedDate: this.getObject().get('capturedDate'),
    });
  };
}
