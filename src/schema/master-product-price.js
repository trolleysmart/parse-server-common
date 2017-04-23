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
  static spawn(info) {
    const object = new MasterProductPrice();

    MasterProductPrice.updateInfoInternal(object, info);

    return object;
  }

  static updateInfoInternal(object, info) {
    object.set('masterProduct', MasterProduct.createWithoutData(info.get('masterProductId')));
    object.set('priceDetails', info.get('priceDetails')
      .toJS());
  }

  constructor(object) {
    super(object, 'MasterProductPrice');

    this.updateInfo = this.updateInfo.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  updateInfo(info) {
    const object = this.getObject();

    MasterProductPrice.updateInfoInternal(object, info);

    return this;
  }

  getInfo() {
    const masterProduct = new MasterProduct(this.getObject()
      .get('masterProduct'));

    return Map({
      id: this.getId(),
      masterProduct,
      masterProductId: masterProduct.getId(),
      priceDetails: Immutable.fromJS(this.getObject()
          .get('priceDetails')),
    });
  }
  }

export {
    MasterProductPrice,
  };

export default MasterProductPrice;
