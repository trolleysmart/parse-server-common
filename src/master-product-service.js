import Immutable from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  NewSearchResultReceivedEvent,
} from './new-search-result-received-event';
import {
  MasterProduct,
} from './schema';

class MasterProductService {
  static create(info) {
    return new Promise((resolve, reject) => {
      MasterProduct.spawn(info)
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
            resolve(new MasterProduct(results[0])
              .getInfo());
          }
        })
        .catch(error => reject(error));
    });
  }

  static update(info) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(MasterProduct);

      query.equalTo('objectId', info.get('id'));
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No master product found with Id: ${info.get('id')}`);
          } else {
            const object = new MasterProduct(results[0]);

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
      const query = ParseWrapperService.createQuery(MasterProduct);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No master product found with Id: ${id}`);
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
    return new Promise((resolve, reject) => MasterProductService.buildSearchQuery(criteria)
      .find()
      .then(results => resolve(Immutable.fromJS(results)
        .map(_ => new MasterProduct(_)
          .getInfo())))
      .catch(error => reject(error)));
  }

  static searchAll(criteria) {
    const event = new NewSearchResultReceivedEvent();
    const promise = MasterProductService.buildSearchQuery(criteria)
      .each(_ => event.raise(new MasterProduct(_)
        .getInfo()));

    return {
      event,
      promise,
    };
  }

  static exists(criteria) {
    return new Promise((resolve, reject) => MasterProductService.buildSearchQuery(criteria)
      .count()
      .then(total => resolve(total > 0))
      .catch(error => reject(error)));
  }

  static buildSearchQuery(criteria) {
    const query = ParseWrapperService.createQuery(MasterProduct);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('description')) {
      const value = conditions.get('description');

      if (value) {
        query.equalTo('description', value);
      }
    }

    if (conditions.has('startsWith_description')) {
      const value = conditions.get('startsWith_description');

      if (value) {
        query.startsWith('description', value);
      }
    }

    if (conditions.has('contains_description')) {
      const value = conditions.get('contains_description');

      if (value) {
        query.contains('description', value);
      }
    }

    if (conditions.has('barcode')) {
      const value = conditions.get('barcode');

      if (value) {
        query.equalTo('barcode', value);
      }
    }

    if (conditions.has('imageUrl')) {
      const value = conditions.get('imageUrl');

      if (value) {
        query.equalTo('imageUrl', value);
      }
    }

    if (conditions.has('tags')) {
      const value = conditions.get('tags');

      if (value) {
        query.containsAll('tags', value.toArray());
      }
    }

    return query;
  }
}

export {
  MasterProductService,
};

export default MasterProductService;
