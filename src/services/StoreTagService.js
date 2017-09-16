// @flow

import { List } from 'immutable';
import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { StoreTag, Store, Tag } from '../schema';

export default class StoreTagService extends ServiceBase {
  static fields = List.of('key', 'name', 'description', 'imageUrl', 'url', 'level', 'parentStoreTag', 'store', 'tag');

  constructor() {
    super(StoreTag, StoreTagService.buildSearchQuery, StoreTagService.buildIncludeQuery, 'store tag');
  }

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    ServiceBase.addIncludeQuery(criteria, query, 'parentStoreTag');
    ServiceBase.addIncludeQuery(criteria, query, 'store');
    ServiceBase.addIncludeQuery(criteria, query, 'tag');

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(StoreTag, criteria);
    const query = StoreTagService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    StoreTagService.fields.forEach((field) => {
      ServiceBase.addExistenceQuery(conditions, query, field);
    });
    ServiceBase.addEqualityQuery(conditions, query, 'key', 'key');
    ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
    ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
    ServiceBase.addEqualityQuery(conditions, query, 'url', 'url');
    ServiceBase.addNumberQuery(conditions, query, 'level', 'level');
    ServiceBase.addLinkQuery(conditions, query, 'parentStoreTag', 'parentStoreTag', StoreTag);
    ServiceBase.addLinkQuery(conditions, query, 'store', 'store', Store);
    ServiceBase.addLinkQuery(conditions, query, 'tag', 'tag', Tag);

    return query;
  };
}
