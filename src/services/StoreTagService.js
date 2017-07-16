// @flow

import { ParseWrapperService } from 'micro-business-parse-server-common';
import { Store, Tag, StoreTag } from '../schema';
import ServiceBase from './ServiceBase';

export default class StoreTagService extends ServiceBase {
  static messagePrefix = 'No store tag found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(StoreTag, info, acl, sessionToken);

  static read = async (info, sessionToken) => ServiceBase.read(StoreTag, info, sessionToken, StoreTagService.messagePrefix);

  static update = async (info, sessionToken) => ServiceBase.update(StoreTag, info, sessionToken, StoreTagService.messagePrefix);

  static delete = async (info, sessionToken) => ServiceBase.delete(StoreTag, info, sessionToken, StoreTagService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(StoreTag, StoreTagService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(StoreTag, StoreTagService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(StoreTagService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(StoreTagService.buildSearchQuery, criteria, sessionToken);

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(StoreTag, criteria);

    if (criteria.has('includeStoreTags')) {
      const value = criteria.get('includeStoreTags');

      if (value) {
        query.include('storeTags');
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

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('key')) {
      const value = conditions.get('key');

      if (value) {
        query.equalTo('key', value);
      }
    }

    ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');

    if (conditions.has('weight')) {
      const value = conditions.get('weight');

      if (value) {
        query.equalTo('weight', value);
      }
    }

    if (conditions.has('url')) {
      const value = conditions.get('url');

      if (value) {
        query.equalTo('url', value);
      }
    }

    if (conditions.has('storeTag')) {
      const value = conditions.get('storeTag');

      if (value) {
        query.equalTo('storeTags', value);
      }
    }

    if (conditions.has('storeTags')) {
      const value = conditions.get('storeTags');

      if (value) {
        query.containedIn('storeTags', value.toArray());
      }
    }

    if (conditions.has('storeTagId')) {
      const value = conditions.get('storeTagId');

      if (value) {
        query.equalTo('storeTags', StoreTag.createWithoutData(value));
      }
    }

    if (conditions.has('storeTagIds')) {
      const value = conditions.get('storeTagIds');

      if (value) {
        query.containedIn('storeTags', value.map(storeTagId => StoreTag.createWithoutData(storeTagId)).toArray());
      }
    }

    if (conditions.has('store')) {
      const value = conditions.get('store');

      if (value) {
        query.equalTo('store', value);
      }
    }

    if (conditions.has('storeId')) {
      const value = conditions.get('storeId');

      if (value) {
        query.equalTo('store', Store.createWithoutData(value));
      }
    }

    if (conditions.has('tag')) {
      const value = conditions.get('tag');

      if (value) {
        query.equalTo('tag', value);
      }
    }

    if (conditions.has('tagId')) {
      const value = conditions.get('tagId');

      if (value) {
        query.equalTo('tag', Tag.createWithoutData(value));
      }
    }

    return query;
  };
}
