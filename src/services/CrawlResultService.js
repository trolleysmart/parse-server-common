// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { CrawlResult, CrawlSession } from '../schema';

export default class CrawlResultService extends ServiceBase {
  constructor() {
    super(CrawlResult, CrawlResultService.buildSearchQuery, CrawlResultService.buildIncludeQuery, 'crawl result');
  }

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    ServiceBase.addIncludeQuery(criteria, query, 'crawlSession');

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(CrawlResult, criteria);
    const query = CrawlResultService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addLinkQuery(conditions, query, 'crawlSession', 'crawlSession', CrawlSession);

    return query;
  };
}
