// @flow

import { ParseWrapperService } from 'micro-business-parse-server-common';
import { CrawlResult, CrawlSession } from '../schema';
import ServiceBase from './ServiceBase';

export default class CrawlResultService extends ServiceBase {
  static messagePrefix = 'No crawl result found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(CrawlResult, info, acl, sessionToken);

  static read = async (info, sessionToken) => ServiceBase.read(CrawlResult, info, sessionToken, CrawlResultService.messagePrefix);

  static update = async (info, sessionToken) => ServiceBase.update(CrawlResult, info, sessionToken, CrawlResultService.messagePrefix);

  static delete = async (info, sessionToken) => ServiceBase.delete(CrawlResult, info, sessionToken, CrawlResultService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(CrawlResult, CrawlResultService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(CrawlResult, CrawlResultService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(CrawlResultService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(CrawlResultService.buildSearchQuery, criteria, sessionToken);

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(CrawlResult, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('crawlSessionId')) {
      const value = conditions.get('crawlSessionId');

      if (value) {
        query.equalTo('crawlSession', CrawlSession.createWithoutData(value));
      }
    }

    return query;
  };
}
