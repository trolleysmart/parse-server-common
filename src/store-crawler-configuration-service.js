import Immutable from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  NewSearchResultReceivedEvent,
} from './new-search-result-received-event';
import {
  StoreCrawlerConfiguration,
} from './schema';

class StoreCrawlerConfigurationService {
  static create(info) {
    return new Promise((resolve, reject) => {
      StoreCrawlerConfiguration.spawn(info)
        .save()
        .then(result => resolve(result.id))
        .catch(error => reject(error));
    });
  }

  static read(id) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(StoreCrawlerConfiguration);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No store crawler configuration found with Id: ${id}`);
          } else {
            resolve(new StoreCrawlerConfiguration(results[0])
              .getInfo());
          }
        })
        .catch(error => reject(error));
    });
  }

  static update(info) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(StoreCrawlerConfiguration);

      query.equalTo('objectId', info.get('id'));
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No store crawler configuration found with Id: ${info.get('id')}`);
          } else {
            const object = new StoreCrawlerConfiguration(results[0]);

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
      const query = ParseWrapperService.createQuery(StoreCrawlerConfiguration);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No store crawler configuration found with Id: ${id}`);
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
    return new Promise((resolve, reject) => StoreCrawlerConfigurationService.buildSearchQuery(criteria)
      .find()
      .then(results => resolve(Immutable.fromJS(results)
        .map(_ => new StoreCrawlerConfiguration(_)
          .getInfo())))
      .catch(error => reject(error)));
  }

  static searchAll(criteria) {
    const event = new NewSearchResultReceivedEvent();
    const promise = StoreCrawlerConfigurationService.buildSearchQuery(criteria)
      .each(_ => event.raise(new StoreCrawlerConfiguration(_)
        .getInfo()));

    return {
      event,
      promise,
    };
  }

  static exists(criteria) {
    return new Promise((resolve, reject) => StoreCrawlerConfigurationService.buildSearchQuery(criteria)
      .count()
      .then(total => resolve(total > 0))
      .catch(error => reject(error)));
  }

  static buildSearchQuery(criteria) {
    const query = ParseWrapperService.createQuery(StoreCrawlerConfiguration, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('key')) {
      const value = conditions.get('key');

      if (value) {
        query.equalTo('key', value);
      }
    }

    return query;
  }
}

export {
  StoreCrawlerConfigurationService,
};

export default StoreCrawlerConfigurationService;
