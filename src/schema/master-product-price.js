import Immutable, {
  Map,
} from 'immutable';
import {
  BaseObject,
} from 'micro-business-parse-server-common';
import {
  MasterProduct,
} from './master-product';

class MasterProductPrice extends BaseObject {
  static updateInfoInternal(object, info) {
    object.set('masterProduct', MasterProduct.createWithoutData(info.get('masterProductId')));
    object.set('priceDetails', info.get('priceDetails').toJS());
  }

  constructor(object) {
    super(object, 'MasterProductPrice');

    this.updateInfo = this.updateInfo.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  static spawn(info) {
    const object = new MasterProductPrice();

    MasterProductPrice.updateInfoInternal(object, info);

    return object;
  }

  updateInfo(info) {
    const object = this.getObject();

    MasterProductPrice.updateInfoInternal(object, info);

    return this;
  }

  getInfo() {
    return Map({
      id: this.getId(),
      masterProduct: new MasterProduct(this.getObject().get('masterProduct')),
      priceDetails: Immutable.fromJS(this.getObject().get('priceDetails')),
    });
  }
}

export {
  MasterProductPrice,
};

export default MasterProductPrice;
