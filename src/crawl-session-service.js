import Immutable from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  CrawlSession,
} from './schema';
import {
  NewSearchResultReceivedEvent,
} from './new-search-result-received-event';

class CrawlSessionService {
  static create(info) {
    return new Promise((resolve, reject) => {
      CrawlSession.spawn(info)
        .save()
        .then(result => resolve(result.id))
        .catch(error => reject(error));
    });
  }

  static read(id) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(CrawlSession);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No crawl session found with Id: ${id}`);
          } else {
            resolve(new CrawlSession(results[0])
              .getInfo());
          }
        })
        .catch(error => reject(error));
    });
  }

  static update(id, info) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(CrawlSession);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No crawl session found with Id: ${id}`);
          } else {
            const object = new CrawlSession(results[0]);

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
      const query = ParseWrapperService.createQuery(CrawlSession);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No crawl session found with Id: ${id}`);
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
    return new Promise((resolve, reject) => CrawlSessionService.buildSearchQuery(criteria)
      .find()
      .then(results => resolve(Immutable.fromJS(results)
        .map(_ => new CrawlSession(_))
        .map(crawlSession => crawlSession.getInfo())))
      .catch(error => reject(error)));
  }

  static searchAll(criteria) {
    const event = new NewSearchResultReceivedEvent();
    const promise = CrawlSessionService.buildSearchQuery(criteria)
      .each(_ => event.raise(new CrawlSession(_)
        .getInfo()));

    return {
      event,
      promise,
    };
  }

  static exists(criteria) {
    return new Promise((resolve, reject) => CrawlSessionService.buildSearchQuery(criteria)
      .count()
      .then(total => resolve(total > 0))
      .catch(error => reject(error)));
  }

  static buildSearchQuery(criteria) {
    const query = ParseWrapperService.createQuery(CrawlSession);

    if (criteria.has('latest') && criteria.get('latest')) {
      query.descending('createdAt');
      query.limit(1);
    }

    if (criteria.has('sessionKey') && criteria.get('sessionKey')) {
      query.equalTo('sessionKey', criteria.get('sessionKey'));
    }

    return query;
  }
}

export {
  CrawlSessionService,
};

export default CrawlSessionService;
