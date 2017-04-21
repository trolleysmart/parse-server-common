import Immutable, {
  Map,
} from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  MasterProduct,
} from './schema';

class MasterProductService {
  static create(product) {
    return new Promise((resolve, reject) => {
      MasterProduct.spawn(product.get('description'), product.get('barcode'), product.get('imageUrl'))
        .save()
        .then(result => resolve(result.id))
        .catch(error => reject(error));
    });
  }

  static read(id) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(MasterProduct);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No master product found with Id: ${id}`);
          } else {
            resolve(MasterProductService.mapParseObjectToDataTransferObject(new MasterProduct(results[0])));
          }
        })
        .catch(error => reject(error));
    });
  }

  static search(criteria) {
    return new Promise((resolve, reject) => MasterProductService.buildSearchQuery(criteria)
      .find()
      .then(results => resolve(Immutable.fromJS(results)
        .map(_ => new MasterProduct(_))
        .map(MasterProductService.mapParseObjectToDataTransferObject)))
      .catch(error => reject(error)));
  }

  static exists(criteria) {
    return new Promise((resolve, reject) => MasterProductService.buildSearchQuery(criteria)
      .count()
      .then(total => resolve(total > 0))
      .catch(error => reject(error)));
  }

  static buildSearchQuery(criteria) {
    const query = ParseWrapperService.createQuery(MasterProduct);

    if (criteria.has('description') && criteria.get('description')) {
      query.equalTo('description', criteria.get('description'));
    }

    if (criteria.has('barcode') && criteria.get('barcode')) {
      query.equalTo('barcode', criteria.get('barcode'));
    }

    if (criteria.has('imageUrl') && criteria.get('imageUrl')) {
      query.equalTo('imageUrl', criteria.get('imageUrl'));
    }

    return query;
  }

  static mapParseObjectToDataTransferObject(masterProduct) {
    return Map({
      id: masterProduct.getId(),
      description: masterProduct.getDescription(),
      barcode: masterProduct.getBarcode(),
      imageUrl: masterProduct.getImageUrl(),
    });
  }
}

export {
  MasterProductService,
};

export default MasterProductService;
