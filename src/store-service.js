import Immutable from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  NewSearchResultReceivedEvent,
} from './new-search-result-received-event';
import {
  Store,
} from './schema';

class StoreService {
  static create(info) {
    return new Promise((resolve, reject) => {
      Store.spawn(info)
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
            resolve(new Store(results[0])
              .getInfo());
          }
        })
        .catch(error => reject(error));
    });
  }

  static update(id, info) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(Store);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No store found with Id: ${id}`);
          } else {
            const object = new Store(results[0]);

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
      const query = ParseWrapperService.createQuery(Store);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No store found with Id: ${id}`);
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
    return new Promise((resolve, reject) => StoreService.buildSearchQuery(criteria)
      .find()
      .then(results => resolve(Immutable.fromJS(results)
        .map(_ => new Store(_))
        .map(store => store.getInfo())))
      .catch(error => reject(error)));
  }

  static searchAll(criteria) {
    const event = new NewSearchResultReceivedEvent();
    const promise = StoreService.buildSearchQuery(criteria)
      .each(_ => event.raise(new Store(_)
        .getInfo()));

    return {
      event,
      promise,
    };
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
}

export {
  StoreService,
};

export default StoreService;
