// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { StoreTag, Store, Tag } from '../schema';

export default class StoreTagService extends ServiceBase {
  static messagePrefix = 'No store tag found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(StoreTag, info, acl, sessionToken);

  static read = async (id, criteria, sessionToken) =>
    ServiceBase.read(StoreTag, id, sessionToken, StoreTagService.messagePrefix, query => StoreTagService.buildIncludeQuery(query, criteria));

  static update = async (info, sessionToken) => ServiceBase.update(StoreTag, info, sessionToken, StoreTagService.messagePrefix);

  static delete = async (id, sessionToken) => ServiceBase.delete(StoreTag, id, sessionToken, StoreTagService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(StoreTag, StoreTagService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(StoreTag, StoreTagService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(StoreTagService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(StoreTagService.buildSearchQuery, criteria, sessionToken);

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    if (criteria.has('includeParentStoreTag')) {
      const value = criteria.get('includeParentStoreTag');

      if (value) {
        query.include('parentStoreTag');
      }
    }

    if (criteria.has('includeStore')) {
      const value = criteria.get('includeStore');

      if (value) {
        query.include('store');
      }
    }

    if (criteria.has('includeTag')) {
      const value = criteria.get('includeTag');

      if (value) {
        query.include('tag');
      }
    }

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(StoreTag, criteria);
    const query = StoreTagService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addEqualityQuery(conditions, query, 'key', 'key');
    ServiceBase.addStringQuery(conditions, query, 'name', 'name');
    ServiceBase.addStringQuery(conditions, query, 'description', 'description');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
    ServiceBase.addEqualityQuery(conditions, query, 'url', 'url');
    ServiceBase.addNumberQuery(conditions, query, 'level', 'level');
    ServiceBase.addLinkQuery(conditions, query, 'parentStoreTag', 'parentStoreTag', StoreTag);
    ServiceBase.addLinkQuery(conditions, query, 'store', 'store', Store);
    ServiceBase.addLinkQuery(conditions, query, 'tag', 'tag', Tag);

    return query;
  };
}
