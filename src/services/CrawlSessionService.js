// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { CrawlSession } from '../schema';

export default class CrawlSessionService extends ServiceBase {
  constructor() {
    super(CrawlSession, CrawlSessionService.buildSearchQuery, CrawlSessionService.buildIncludeQuery, 'crawl session');
  }

  static buildIncludeQuery = query => query;

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(CrawlSession, criteria);
    const query = CrawlSessionService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addEqualityQuery(conditions, query, 'key', 'key');
    ServiceBase.addDateTimeQuery(conditions, query, 'startDateTime', 'startDateTime');
    ServiceBase.addDateTimeQuery(conditions, query, 'endDateTime', 'endDateTime');

    return query;
  };
}
