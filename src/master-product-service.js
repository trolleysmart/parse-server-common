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

  static exists({
    description,
    barcode,
    imageUrl,
  }) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(MasterProduct);

      if (description) {
        query.equalTo('description', description);
      }

      if (barcode) {
        query.equalTo('barcode', barcode);
      }

      if (imageUrl) {
        query.equalTo('imageUrl', imageUrl);
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
