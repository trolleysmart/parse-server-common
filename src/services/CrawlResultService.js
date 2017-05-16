// @flow

import Immutable from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import { CrawlResult, CrawlSession } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class CrawlResultService {
  static create = info =>
    new Promise((resolve, reject) => {
      CrawlResult.spawn(info).save().then(result => resolve(result.id)).catch(error => reject(error));
    });

  static read = id =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(CrawlResult)
        .equalTo('objectId', id)
        .limit(1)
        .find()
        .then(results => {
          if (results.length === 0) {
            reject(`No crawl result found with Id: ${id}`);
          } else {
            resolve(new CrawlResult(results[0]).getInfo());
          }
        })
        .catch(error => reject(error));
    });

  static update = info =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(CrawlResult)
        .equalTo('objectId', info.get('id'))
        .limit(1)
        .find()
        .then(results => {
          if (results.length === 0) {
            reject(`No crawl result found with Id: ${info.get('id')}`);
          } else {
            const object = new CrawlResult(results[0]);

            object.updateInfo(info).saveObject().then(() => resolve(object.getId())).catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });

  static delete = id =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(CrawlResult)
        .equalTo('objectId', id)
        .limit(1)
        .find()
        .then(results => {
          if (results.length === 0) {
            reject(`No crawl result found with Id: ${id}`);
          } else {
            results[0].destroy().then(() => resolve()).catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });

  static search = criteria =>
    new Promise((resolve, reject) =>
      CrawlResultService.buildSearchQuery(criteria)
        .find()
        .then(results => resolve(Immutable.fromJS(results).map(_ => new CrawlResult(_).getInfo())))
        .catch(error => reject(error)),
    );

  static searchAll = criteria => {
    const event = new NewSearchResultReceivedEvent();
    const promise = CrawlResultService.buildSearchQuery(criteria).each(_ => event.raise(new CrawlResult(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = criteria =>
    new Promise((resolve, reject) =>
      CrawlResultService.buildSearchQuery(criteria).count().then(total => resolve(total > 0)).catch(error => reject(error)),
    );

  static buildSearchQuery = criteria => {
    const query = ParseWrapperService.createQuery(CrawlResult, criteria);

    if (!criteria.has('conditions')) {
      return ParseWrapperService.createQueryIncludingObjectIds(CrawlResult, query, criteria);
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('crawlSessionId')) {
      const value = conditions.get('crawlSessionId');

      if (value) {
        query.equalTo('crawlSession', CrawlSession.createWithoutData(value));
      }
    }

    return ParseWrapperService.createQueryIncludingObjectIds(CrawlResult, query, criteria);
  };
}
