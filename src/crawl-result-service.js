import Immutable from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  CrawlResult,
  CrawlSession,
} from './schema';
import {
  NewSearchResultReceivedEvent,
} from './new-search-result-received-event';

class CrawlResultService {
  static create(info) {
    return new Promise((resolve, reject) => {
      CrawlResult.spawn(info)
        .save()
        .then(result => resolve(result.id))
        .catch(error => reject(error));
    });
  }

  static read(id) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(CrawlResult);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No crawl result found with Id: ${id}`);
          } else {
            resolve(new CrawlResult(results[0])
              .getInfo());
          }
        })
        .catch(error => reject(error));
    });
  }

  static update(info) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(CrawlResult);

      query.equalTo('objectId', info.get('id'));
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No crawl result found with Id: ${info.get('id')}`);
          } else {
            const object = new CrawlResult(results[0]);

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
      const query = ParseWrapperService.createQuery(CrawlResult);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No crawl result found with Id: ${id}`);
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
    return new Promise((resolve, reject) => CrawlResultService.buildSearchQuery(criteria)
      .find()
      .then(results => resolve(Immutable.fromJS(results)
        .map(_ => new CrawlResult(_))
        .map(crawlResult => crawlResult.getInfo())))
      .catch(error => reject(error)));
  }

  static searchAll(criteria) {
    const event = new NewSearchResultReceivedEvent();
    const promise = CrawlResultService.buildSearchQuery(criteria)
      .each(_ => event.raise(new CrawlResult(_)
        .getInfo()));

    return {
      event,
      promise,
    };
  }

  static exists(criteria) {
    return new Promise((resolve, reject) => CrawlResultService.buildSearchQuery(criteria)
      .count()
      .then(total => resolve(total > 0))
      .catch(error => reject(error)));
  }

  static buildSearchQuery(criteria) {
    const query = ParseWrapperService.createQuery(CrawlResult);

    if (criteria.has('crawlSessionId') && criteria.get('crawlSessionId')) {
      query.equalTo('crawlSession', CrawlSession.createWithoutData(criteria.get('crawlSessionId')));
    }

    return query;
  }
}

export {
  CrawlResultService,
};

export default CrawlResultService;
