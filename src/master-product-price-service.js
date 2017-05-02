import Immutable from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  MasterProduct,
  MasterProductPrice,
  Store,
} from './schema';
import {
  NewSearchResultReceivedEvent,
} from './new-search-result-received-event';

class MasterProductPriceService {
  static create(info) {
    return new Promise((resolve, reject) => {
      MasterProductPrice.spawn(info)
        .save()
        .then(result => resolve(result.id))
        .catch(error => reject(error));
    });
  }

  static read(id) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(MasterProductPrice);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No master product price found with Id: ${id}`);
          } else {
            resolve(new MasterProductPrice(results[0])
              .getInfo());
          }
        })
        .catch(error => reject(error));
    });
  }

  static update(info) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(MasterProductPrice);

      query.equalTo('objectId', info.get('id'));
      query.limit(1);

      query.find()
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
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(MasterProductPrice);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
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
    });
  }

  static search(criteria) {
    return new Promise((resolve, reject) => MasterProductPriceService.buildSearchQuery(criteria)
      .find()
      .then(results => resolve(Immutable.fromJS(results)
        .map(_ => new MasterProductPrice(_)
          .getInfo())))
      .catch(error => reject(error)));
  }

  static searchAll(criteria) {
    const event = new NewSearchResultReceivedEvent();
    const promise = MasterProductPriceService.buildSearchQuery(criteria)
      .each(_ => event.raise(new MasterProductPrice(_)
        .getInfo()));

    return {
      event,
      promise,
    };
  }

  static exists(criteria) {
    return new Promise((resolve, reject) => MasterProductPriceService.buildSearchQuery(criteria)
      .count()
      .then(total => resolve(total > 0))
      .catch(error => reject(error)));
  }

  static buildSearchQuery(criteria) {
    const query = ParseWrapperService.createQuery(MasterProductPrice, criteria);

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

      /* if (conditions.has('description')) {
       * const query = ParseWrapperService.createQuery(MasterProductPrice, criteria);
       *   const value = conditions.get('description');

       *   if (value) {
       *     query.equalTo('description', value);
       *   }
       * }*/

    return ParseWrapperService.createQueryIncludingObjectIds(MasterProductPrice, query, criteria);
  }
}

export {
  MasterProductPriceService,
};

export default MasterProductPriceService;
