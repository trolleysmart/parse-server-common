import Immutable from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  MasterProduct,
  MasterProductPrice,
  Store,
} from './schema';
import NewSearchResultReceivedEvent from './new-search-result-received-event';

export default class MasterProductPriceService {
  static create = info => new Promise((resolve, reject) => {
    MasterProductPrice.spawn(info)
      .save()
      .then(result => resolve(result.id))
      .catch(error => reject(error));
  })

  static read = id => new Promise((resolve, reject) => {
    ParseWrapperService.createQuery(MasterProductPrice)
      .equalTo('objectId', id)
      .limit(1)
      .find()
      .then((results) => {
        if (results.length === 0) {
          reject(`No master product price found with Id: ${id}`);
        } else {
          resolve(new MasterProductPrice(results[0])
            .getInfo());
        }
      })
      .catch(error => reject(error));
  })

  static update = info => new Promise((resolve, reject) => {
    ParseWrapperService.createQuery(MasterProductPrice)
      .equalTo('objectId', info.get('id'))
      .limit(1)
      .find()
      .then((results) => {
        if (results.length === 0) {
          reject(`No master product price found with Id: ${info.get('id')}`);
        } else {
          const object = new MasterProductPrice(results[0]);

          object.updateInfo(info)
            .saveObject()
            .then(() => resolve(object.getId()))
            .catch(error => reject(error));
        }
      })
      .catch(error => reject(error));
  })

  static delete = id => new Promise((resolve, reject) => {
    ParseWrapperService.createQuery(MasterProductPrice)
      .equalTo('objectId', id)
      .limit(1)
      .find()
      .then((results) => {
        if (results.length === 0) {
          reject(`No master product price found with Id: ${id}`);
        } else {
          results[0].destroy()
            .then(() => resolve())
            .catch(error => reject(error));
        }
      })
      .catch(error => reject(error));
  })

  static search = criteria => new Promise((resolve, reject) => MasterProductPriceService.buildSearchQuery(criteria)
    .find()
    .then(results => resolve(Immutable.fromJS(results)
      .map(_ => new MasterProductPrice(_)
        .getInfo())))
    .catch(error => reject(error)))

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = MasterProductPriceService.buildSearchQuery(criteria)
      .each(_ => event.raise(new MasterProductPrice(_)
        .getInfo()));

    return {
      event,
      promise,
    };
  }

  static exists = criteria => new Promise((resolve, reject) => MasterProductPriceService.buildSearchQuery(criteria)
    .count()
    .then(total => resolve(total > 0))
    .catch(error => reject(error)))

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(MasterProductPrice, criteria);

    if (criteria.has('includeStore')) {
      const value = criteria.get('includeStore');

      if (value) {
        query.include('store');
      }
    }

    if (criteria.has('includeMasterProduct')) {
      const value = criteria.get('includeMasterProduct');

      if (value) {
        query.include('masterProduct');
      }
    }

    if (!criteria.has('conditions')) {
      return ParseWrapperService.createQueryIncludingObjectIds(MasterProductPrice, query, criteria);
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('masterProductId')) {
      const value = conditions.get('masterProductId');

      if (value) {
        query.equalTo('masterProduct', MasterProduct.createWithoutData(value));
      }
    }

    if (conditions.has('storeId')) {
      const value = conditions.get('storeId');

      if (value) {
        query.equalTo('store', Store.createWithoutData(value));
      }
    }

    if (conditions.has('capturedDate')) {
      const value = conditions.get('capturedDate');

      if (value) {
        query.equalTo('capturedDate', value);
      }
    }

    if (conditions.has('lessThanOrEqualTo_capturedDate')) {
      const value = conditions.get('lessThanOrEqualTo_capturedDate');

      if (value) {
        query.lessThanOrEqualTo('capturedDate', value);
      }
    }

    if (conditions.has('greaterThanOrEqualTo_capturedDate')) {
      const value = conditions.get('greaterThanOrEqualTo_capturedDate');

      if (value) {
        query.greaterThanOrEqualTo('capturedDate', value);
      }
    }

    if (conditions.has('specialType')) {
      const value = conditions.get('specialType');

      if (value) {
        query.equalTo('priceDetails.specialType', value);
      }
    }

    if (conditions.has('not_specialType')) {
      const value = conditions.get('not_specialType');

      if (value) {
        query.notEqualTo('priceDetails.specialType', value);
      }
    }

    if (conditions.has('masterProductDescription')) {
      const masterProductQuery = ParseWrapperService.createQuery(MasterProduct, criteria);
      const value = conditions.get('masterProductDescription');

      if (value) {
        masterProductQuery.equalTo('description', value);
        query.matchesQuery('masterProduct', masterProductQuery);
      }
    }

    if (conditions.has('startsWith_masterProductDescription')) {
      const masterProductQuery = ParseWrapperService.createQuery(MasterProduct, criteria);
      const value = conditions.get('startsWith_masterProductDescription');

      if (value) {
        masterProductQuery.startsWith('description', value);
        query.matchesQuery('masterProduct', masterProductQuery);
      }
    }

    if (conditions.has('contains_masterProductDescription')) {
      const masterProductQuery = ParseWrapperService.createQuery(MasterProduct, criteria);
      const value = conditions.get('contains_masterProductDescription');

      if (value) {
        masterProductQuery.contains('description', value);
        query.matchesQuery('masterProduct', masterProductQuery);
      }
    }

    if (conditions.has('storeName')) {
      const masterProductQuery = ParseWrapperService.createQuery(Store, criteria);
      const value = conditions.get('storeName');

      if (value) {
        masterProductQuery.equalTo('name', value);
        query.matchesQuery('store', masterProductQuery);
      }
    }

    if (conditions.has('startsWith_storeName')) {
      const masterProductQuery = ParseWrapperService.createQuery(Store, criteria);
      const value = conditions.get('startsWith_storeName');

      if (value) {
        masterProductQuery.startsWith('name', value);
        query.matchesQuery('store', masterProductQuery);
      }
    }

    if (conditions.has('contains_storeName')) {
      const masterProductQuery = ParseWrapperService.createQuery(Store, criteria);
      const value = conditions.get('contains_storeName');

      if (value) {
        masterProductQuery.contains('name', value);
        query.matchesQuery('store', masterProductQuery);
      }
    }

    return ParseWrapperService.createQueryIncludingObjectIds(MasterProductPrice, query, criteria);
  }
}
