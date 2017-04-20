import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  MasterProduct,
} from './schema';

class MasterProductService {
  static create({
    description,
    barcode,
    imageUrl,
  }) {
    return new Promise((resolve, reject) => {
      MasterProduct.spawn(description, barcode, imageUrl)
        .save()
        .then(result => resolve(result.id))
        .catch(error => reject(error));
    });
  }

  static exists(product) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(MasterProduct);

      if (product.has('description') && product.get('description')) {
        query.equalTo('description', product.get('description'));
      }

      if (product.has('barcode') && product.get('barcode')) {
        query.equalTo('barcode', product.get('barcode'));
      }

      if (product.has('imageUrl') && product.get('imageUrl')) {
        query.equalTo('imageUrl', product.get('imageUrl'));
      }

      return query.count()
        .then(total => resolve(total > 0))
        .catch(error => reject(error));
    });
  }
}

export {
  MasterProductService,
};

export default MasterProductService;
