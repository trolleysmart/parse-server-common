// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { CrawlResult, CrawlSession } from '../schema';

export default class CrawlResultService extends ServiceBase {
  static messagePrefix = 'No crawl result found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(CrawlResult, info, acl, sessionToken);

  static read = async (id, criteria, sessionToken) =>
    ServiceBase.read(CrawlResult, id, sessionToken, CrawlResultService.messagePrefix, query => CrawlResultService.buildIncludeQuery(query, criteria));

  static update = async (info, sessionToken) => ServiceBase.update(CrawlResult, info, sessionToken, CrawlResultService.messagePrefix);

  static delete = async (id, sessionToken) => ServiceBase.delete(CrawlResult, id, sessionToken, CrawlResultService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(CrawlResult, CrawlResultService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(CrawlResult, CrawlResultService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(CrawlResultService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(CrawlResultService.buildSearchQuery, criteria, sessionToken);

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    if (criteria.has('includeCrawlSession')) {
      const value = criteria.get('includeCrawlSession');

      if (value) {
        query.include('crawlSession');
      }
    }

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(CrawlResult, criteria);
    const query = CrawlResultService.buildIncludeQuery(queryWithoutIncludes, criteria);
    const conditions = criteria.get('conditions');

    ServiceBase.addLinkQuery(conditions, query, 'crawlSession', 'crawlSession', CrawlSession);

    return query;
  };
}
