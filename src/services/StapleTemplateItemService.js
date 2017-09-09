// @flow

import { List } from 'immutable';
import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { StapleTemplateItem, StapleTemplate, Tag } from '../schema';

export default class StapleTemplateItemService extends ServiceBase {
  static fields = List.of('name', 'description', 'imageUrl', 'popular', 'stapleTemplates', 'tags');

  constructor() {
    super(StapleTemplateItem, StapleTemplateItemService.buildSearchQuery, StapleTemplateItemService.buildIncludeQuery, 'staple template item');
  }

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    ServiceBase.addIncludeQuery(criteria, query, 'stapleTemplates');
    ServiceBase.addIncludeQuery(criteria, query, 'tags');

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(StapleTemplateItem, criteria);
    const query = StapleTemplateItemService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    StapleTemplateItemService.fields.forEach(field => ServiceBase.addExistenceQuery(conditions, query, field));
    ServiceBase.addStringQuery(conditions, query, 'name', 'name');
    ServiceBase.addStringQuery(conditions, query, 'description', 'description');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
    ServiceBase.addEqualityQuery(conditions, query, 'popular', 'popular');
    ServiceBase.addLinkQuery(conditions, query, 'stapleTemplate', 'stapleTemplates', StapleTemplate);
    ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', Tag);

    return query;
  };
}
