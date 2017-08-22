// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { CrawlSession } from '../schema';

export default class CrawlSessionService extends ServiceBase {
  static messagePrefix = 'No crawl session found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(CrawlSession, info, acl, sessionToken);

  static read = async (id, sessionToken) => ServiceBase.read(CrawlSession, id, sessionToken, CrawlSessionService.messagePrefix);

  static update = async (info, sessionToken) => ServiceBase.update(CrawlSession, info, sessionToken, CrawlSessionService.messagePrefix);

  static delete = async (id, sessionToken) => ServiceBase.delete(CrawlSession, id, sessionToken, CrawlSessionService.messagePrefix);

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

    if (conditions.has('key')) {
      const value = conditions.get('key');

      if (value) {
        query.equalTo('key', value);
      }
    }

    ServiceBase.addDateTimeSearchToQuery(conditions, query, 'startDateTime', 'startDateTime');
    ServiceBase.addDateTimeSearchToQuery(conditions, query, 'endDateTime', 'endDateTime');

    return query;
  };
}
