import Immutable from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  MasterProduct,
  MasterProductPrice,
} from './schema';

class MasterProductPriceService {
  static create(productPrice) {
    return new Promise((resolve, reject) => {
      MasterProductPrice.spawn(productPrice.get('masterProductId'), productPrice.get('priceDetails'))
        .save()
        .then(result => resolve(result.id))
        .catch(error => reject(error));
    });
  }

  static search(productPrice, includeMasterProductDetails) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(MasterProductPrice);

      if (productPrice.has('masterProductId') && productPrice.get('masterProductId')) {
        query.equalTo('masterProduct', MasterProduct.createWithoutData(productPrice.get('masterProductId')));
      }

      if (productPrice.has('priceDetails') && productPrice.get('priceDetails')) {
        query.equalTo('priceDetails', productPrice.get('priceDetails'));
      }

      if (includeMasterProductDetails) {
        query.include('masterProduct');
      }

      return query.find()
        .then(results => Immutable.fromJS(results)
          .map(MasterProductPriceService.mapMasterProductPriceToResponseFormat))
        .catch(error => reject(error));
    });
  }

  static exists(productPrice) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(MasterProductPrice);

      if (productPrice.has('masterProductId') && productPrice.get('masterProductId')) {
        query.equalTo('masterProduct', MasterProduct.createWithoutData(productPrice.get('masterProductId')));
      }

      if (productPrice.has('priceDetails') && productPrice.get('priceDetails')) {
        query.equalTo('priceDetails', productPrice.get('priceDetails'));
      }

      return query.count()
        .then(total => resolve(total > 0))
        .catch(error => reject(error));
    });
  }

  static mapMasterProductPriceToResponseFormat(masterProductPrice) {
    return Map({
      id: masterProductPrice.getId(),
      masterProduct: masterProductPrice.getMasterProduct(),
      priceDetails: masterProductPrice.getPriceDetails(),
    });
  }
}

export {
  MasterProductPriceService,
};

export default MasterProductPriceService;
