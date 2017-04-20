import Immutable from 'immutable';
import {
  BaseObject,
} from 'micro-business-parse-server-common';
import {
  MasterProduct,
} from './master-product';

class MasterProductPrice extends BaseObject {
  constructor(object) {
    super(object, 'MasterProductPrice');

    this.getMasterProduct = this.getMasterProduct.bind(this);
    this.getPriceDetails = this.getPriceDetails.bind(this);
  }

  static spawn(
    masterProductId,
    priceDetails,
  ) {
    const object = new MasterProductPrice();

    object.set('masterProduct', MasterProduct.createWithoutData(masterProductId));
    object.set('priceDetails', priceDetails);

    return object;
  }

  getMasterProduct() {
    return new MasterProduct(this.getObject()
      .get('masterProduct'));
  }

  getPriceDetails() {
    return Immutable.fromJS(this.getObject()
      .get('priceDetails'));
  }
}

export {
  MasterProductPrice,
};

export default MasterProductPrice;
