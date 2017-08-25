// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { StapleTemplateItem, StapleTemplate, Tag } from '../schema';

export default class StapleTemplateItemService extends ServiceBase {
  static messagePrefix = 'No staple template item found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(StapleTemplateItem, info, acl, sessionToken);

  static read = async (id, criteria, sessionToken) =>
    ServiceBase.read(StapleTemplateItem, id, sessionToken, StapleTemplateItemService.messagePrefix, query =>
      StapleTemplateItemService.buildIncludeQuery(query, criteria),
    );

  static update = async (info, sessionToken) => ServiceBase.update(StapleTemplateItem, info, sessionToken, StapleTemplateItemService.messagePrefix);

  static delete = async (id, sessionToken) => ServiceBase.delete(StapleTemplateItem, id, sessionToken, StapleTemplateItemService.messagePrefix);

  static search = async (criteria, sessionToken) =>
    ServiceBase.search(StapleTemplateItem, StapleTemplateItemService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) =>
    ServiceBase.searchAll(StapleTemplateItem, StapleTemplateItemService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(StapleTemplateItemService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(StapleTemplateItemService.buildSearchQuery, criteria, sessionToken);

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    if (criteria.has('includeStapleTemplates')) {
      const value = criteria.get('includeStapleTemplates');

      if (value) {
        query.include('stapleTemplates');
      }
    }

    if (criteria.has('includeTags')) {
      const value = criteria.get('includeTags');

      if (value) {
        query.include('tags');
      }
    }

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(StapleTemplateItem, criteria);
    const query = StapleTemplateItemService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addStringQuery(conditions, query, 'name', 'name');
    ServiceBase.addStringQuery(conditions, query, 'description', 'description');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
    ServiceBase.addEqualityQuery(conditions, query, 'popular', 'popular');
    ServiceBase.addLinkQuery(conditions, query, 'stapleTemplate', 'stapleTemplates', StapleTemplate);
    ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', Tag);

    return query;
  };
}
