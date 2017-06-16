// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { CrawlSession } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class CrawlSessionService {
  static create = async (info) => {
    const result = await CrawlSession.spawn(info).save();

    return result.id;
  };

  static read = async (id) => {
    const results = await ParseWrapperService.createQuery(CrawlSession).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No crawl session found with Id: ${id}`);
    }

    return new CrawlSession(results[0]).getInfo();
  };

  static update = async (info) => {
    const results = await ParseWrapperService.createQuery(CrawlSession).equalTo('objectId', info.get('id')).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No crawl session found with Id: ${info.get('id')}`);
    } else {
      const object = new CrawlSession(results[0]);

      await object.updateInfo(info).saveObject();

      return object.getId();
    }
  };

  static delete = async (id) => {
    const results = await ParseWrapperService.createQuery(CrawlSession).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No crawl session found with Id: ${id}`);
    } else {
      await results[0].destroy();
    }
  };

  static search = async (criteria) => {
    const results = await CrawlSessionService.buildSearchQuery(criteria).find();

    return Immutable.fromJS(results).map(_ => new CrawlSession(_).getInfo());
  };

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = CrawlSessionService.buildSearchQuery(criteria).each(_ => event.raise(new CrawlSession(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria) => {
    const total = await CrawlSessionService.count(criteria);

    return total > 0;
  };

  static count = async criteria => CrawlSessionService.buildSearchQuery(criteria).count();

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(CrawlSession, criteria);

    if (!criteria.has('conditions')) {
      return query;
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

    return query;
  };
}
