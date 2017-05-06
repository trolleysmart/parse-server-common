import Immutable from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  CrawlSession,
} from './schema';
import NewSearchResultReceivedEvent from './new-search-result-received-event';

export default class CrawlSessionService {
  static create = info => new Promise((resolve, reject) => {
    CrawlSession.spawn(info)
      .save()
      .then(result => resolve(result.id))
      .catch(error => reject(error));
  })

  static read = id => new Promise((resolve, reject) => {
    ParseWrapperService.createQuery(CrawlSession)
      .equalTo('objectId', id)
      .limit(1)
      .find()
      .then((results) => {
        if (results.length === 0) {
          reject(`No crawl session found with Id: ${id}`);
        } else {
          resolve(new CrawlSession(results[0])
            .getInfo());
        }
      })
      .catch(error => reject(error));
  })

  static update = info => new Promise((resolve, reject) => {
    ParseWrapperService.createQuery(CrawlSession)
      .equalTo('objectId', info.get('id'))
      .limit(1)
      .find()
      .then((results) => {
        if (results.length === 0) {
          reject(`No crawl session found with Id: ${info.get('id')}`);
        } else {
          const object = new CrawlSession(results[0]);

          object.updateInfo(info)
            .saveObject()
            .then(() => resolve(object.getId()))
            .catch(error => reject(error));
        }
      })
      .catch(error => reject(error));
  })

  static delete = id => new Promise((resolve, reject) => {
    ParseWrapperService.createQuery(CrawlSession)
      .equalTo('objectId', id)
      .limit(1)
      .find()
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
  })

  static search = criteria => new Promise((resolve, reject) => CrawlSessionService.buildSearchQuery(criteria)
    .find()
    .then(results => resolve(Immutable.fromJS(results)
      .map(_ => new CrawlSession(_)
        .getInfo())))
    .catch(error => reject(error)))

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = CrawlSessionService.buildSearchQuery(criteria)
      .each(_ => event.raise(new CrawlSession(_)
        .getInfo()));

    return {
      event,
      promise,
    };
  }

  static exists = criteria => new Promise((resolve, reject) => CrawlSessionService.buildSearchQuery(criteria)
    .count()
    .then(total => resolve(total > 0))
    .catch(error => reject(error)))

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(CrawlSession, criteria);

    if (!criteria.has('conditions')) {
      return ParseWrapperService.createQueryIncludingObjectIds(CrawlSession, query, criteria);
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('sessionKey')) {
      const value = conditions.get('sessionKey');

      if (value) {
        query.equalTo('sessionKey', value);
      }
    }

    if (conditions.has('startsWith_sessionKey')) {
      const value = conditions.get('startsWith_sessionKey');

      if (value) {
        query.startsWith('sessionKey', value);
      }
    }

    if (conditions.has('contains_sessionKey')) {
      const value = conditions.get('contains_sessionKey');

      if (value) {
        query.contains('sessionKey', value);
      }
    }

    if (conditions.has('startDateTime')) {
      const value = conditions.get('startDateTime');

      if (value) {
        query.equalTo('startDateTime', value);
      }
    }

    if (conditions.has('lessThanOrEqualTo_startDateTime')) {
      const value = conditions.get('lessThanOrEqualTo_startDateTime');

      if (value) {
        query.lessThanOrEqualTo('startDateTime', value);
      }
    }

    if (conditions.has('greaterThanOrEqualTo_startDateTime')) {
      const value = conditions.get('greaterThanOrEqualTo_startDateTime');

      if (value) {
        query.greaterThanOrEqualTo('startDateTime', value);
      }
    }

    if (conditions.has('endDateTime')) {
      const value = conditions.get('endDateTime');

      if (value) {
        query.equalTo('endDateTime', value);
      }
    }

    if (conditions.has('lessThanOrEqualTo_endDateTime')) {
      const value = conditions.get('lessThanOrEqualTo_endDateTime');

      if (value) {
        query.lessThanOrEqualTo('endDateTime', value);
      }
    }

    if (conditions.has('greaterThanOrEqualTo_endDateTime')) {
      const value = conditions.get('greaterThanOrEqualTo_endDateTime');

      if (value) {
        query.greaterThanOrEqualTo('endDateTime', value);
      }
    }

    return ParseWrapperService.createQueryIncludingObjectIds(CrawlSession, query, criteria);
  }
}
