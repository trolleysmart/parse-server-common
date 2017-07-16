// @flow

import { ParseWrapperService } from 'micro-business-parse-server-common';
import { CrawlSession } from '../schema';
import ServiceBase from './ServiceBase';

export default class CrawlSessionService extends ServiceBase {
  static messagePrefix = 'No crawl session found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(CrawlSession, info, acl, sessionToken);

  static read = async (info, sessionToken) => ServiceBase.read(CrawlSession, info, sessionToken, CrawlSessionService.messagePrefix);

  static update = async (info, sessionToken) => ServiceBase.update(CrawlSession, info, sessionToken, CrawlSessionService.messagePrefix);

  static delete = async (info, sessionToken) => ServiceBase.delete(CrawlSession, info, sessionToken, CrawlSessionService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(CrawlSession, CrawlSessionService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(CrawlSession, CrawlSessionService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(CrawlSessionService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(CrawlSessionService.buildSearchQuery, criteria, sessionToken);

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
