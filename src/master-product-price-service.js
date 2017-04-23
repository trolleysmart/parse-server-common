import Immutable from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  MasterProduct,
  MasterProductPrice,
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

  static update(id, info) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(MasterProductPrice);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No master product price found with Id: ${id}`);
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
        .map(_ => new MasterProductPrice(_))
        .map(masterProductPrice => masterProductPrice.getInfo())))
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
    const query = ParseWrapperService.createQuery(MasterProductPrice);

    if (criteria.has('masterProductId') && criteria.get('masterProductId')) {
      query.equalTo('masterProduct', MasterProduct.createWithoutData(criteria.get('masterProductId')));
    }

    return query;
  }
}

export {
  MasterProductPriceService,
};

export default MasterProductPriceService;
