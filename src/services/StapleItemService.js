// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { StapleItem, StapleTemplate, Tag } from '../schema';

export default class StapleItemService extends ServiceBase {
  static messagePrefix = 'No staple item found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(StapleItem, info, acl, sessionToken);

  static read = async (id, criteria, sessionToken) =>
    ServiceBase.read(StapleItem, id, sessionToken, StapleItemService.messagePrefix, query => StapleItemService.buildIncludeQuery(query, criteria));

  static update = async (info, sessionToken) => ServiceBase.update(StapleItem, info, sessionToken, StapleItemService.messagePrefix);

  static delete = async (id, sessionToken) => ServiceBase.delete(StapleItem, id, sessionToken, StapleItemService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(StapleItem, StapleItemService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(StapleItem, StapleItemService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(StapleItemService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(StapleItemService.buildSearchQuery, criteria, sessionToken);

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    if (criteria.has('includeUser')) {
      const value = criteria.get('includeUser');

      if (value) {
        query.include('user');
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
    const queryWithoutIncludes = ParseWrapperService.createQuery(StapleItem, criteria);
    const query = StapleItemService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addStringQuery(conditions, query, 'name', 'name');
    ServiceBase.addStringQuery(conditions, query, 'description', 'description');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
    ServiceBase.addLinkQuery(conditions, query, 'stapleTemplate', 'stapleTemplates', StapleTemplate);

    if (conditions.has('userId')) {
      const value = conditions.get('userId');

      if (value) {
        query.equalTo('user', ParseWrapperService.createUserWithoutData(value));
      }
    }

    if (conditions.has('user')) {
      const value = conditions.get('user');

      if (value) {
        query.equalTo('user', value);
      }
    }

    ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', Tag);

    return query;
  };
}
