// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { StapleTemplate } from '../schema';

export default class StapleTemplateService extends ServiceBase {
  constructor() {
    super(StapleTemplate, StapleTemplateService.buildSearchQuery, StapleTemplateService.buildIncludeQuery, 'staple template');
  }

  static buildIncludeQuery = query => query;

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(StapleTemplate, criteria);
    const query = StapleTemplateService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addStringQuery(conditions, query, 'name', 'name');
    ServiceBase.addStringQuery(conditions, query, 'description', 'description');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');

    return query;
  };
}
