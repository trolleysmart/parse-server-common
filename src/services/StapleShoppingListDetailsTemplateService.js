// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { StapleShoppingListDetailsTemplate, StapleTemplate, Tag } from '../schema';

export default class StapleShoppingListDetailsTemplateService extends ServiceBase {
  static messagePrefix = 'No staple shopping list details template found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(StapleShoppingListDetailsTemplate, info, acl, sessionToken);

  static read = async (id, criteria, sessionToken) =>
    ServiceBase.read(StapleShoppingListDetailsTemplate, id, sessionToken, StapleShoppingListDetailsTemplateService.messagePrefix, query =>
      StapleShoppingListDetailsTemplateService.buildIncludeQuery(query, criteria),
    );

  static update = async (info, sessionToken) =>
    ServiceBase.update(StapleShoppingListDetailsTemplate, info, sessionToken, StapleShoppingListDetailsTemplateService.messagePrefix);

  static delete = async (id, sessionToken) =>
    ServiceBase.delete(StapleShoppingListDetailsTemplate, id, sessionToken, StapleShoppingListDetailsTemplateService.messagePrefix);

  static search = async (criteria, sessionToken) =>
    ServiceBase.search(StapleShoppingListDetailsTemplate, StapleShoppingListDetailsTemplateService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) =>
    ServiceBase.searchAll(StapleShoppingListDetailsTemplate, StapleShoppingListDetailsTemplateService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) =>
    ServiceBase.count(StapleShoppingListDetailsTemplateService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) =>
    ServiceBase.exists(StapleShoppingListDetailsTemplateService.buildSearchQuery, criteria, sessionToken);

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
    const queryWithoutIncludes = ParseWrapperService.createQuery(StapleShoppingListDetailsTemplate, criteria);
    const query = StapleShoppingListDetailsTemplateService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addStringQuery(conditions, query, 'name', 'name');
    ServiceBase.addStringQuery(conditions, query, 'description', 'description');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
    ServiceBase.addLinkQuery(conditions, query, 'stapleTemplate', 'stapleTemplates', StapleTemplate);
    ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', Tag);

    return query;
  };
}
