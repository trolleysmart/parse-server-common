import Immutable, {
  Map,
} from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  Store,
} from './schema';

class StoreService {
  static create(store) {
    return new Promise((resolve, reject) => {
      Store.spawn(store.get('name'))
        .save()
        .then(result => resolve(result.id))
        .catch(error => reject(error));
    });
  }

  static read(id) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(Store);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No store found with Id: ${id}`);
          } else {
            resolve(StoreService.mapParseObjectToDataTransferObject(new Store(results[0])));
          }
        })
        .catch(error => reject(error));
    });
  }

  static search(criteria) {
    return new Promise((resolve, reject) => StoreService.buildSearchQuery(criteria)
      .find()
      .then(results => resolve(Immutable.fromJS(results)
        .map(_ => new Store(_))
        .map(StoreService.mapParseObjectToDataTransferObject)))
      .catch(error => reject(error)));
  }

  static exists(criteria) {
    return new Promise((resolve, reject) => StoreService.buildSearchQuery(criteria)
      .count()
      .then(total => resolve(total > 0))
      .catch(error => reject(error)));
  }

  static buildSearchQuery(criteria) {
    const query = ParseWrapperService.createQuery(Store);

    if (criteria.has('name') && criteria.get('name')) {
      query.equalTo('name', criteria.get('name'));
    }

    return query;
  }

  static mapParseObjectToDataTransferObject(store) {
    return Map({
      id: store.getId(),
      name: store.getName(),
    });
  }
}

export {
  StoreService,
};

export default StoreService;
