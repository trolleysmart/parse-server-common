// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { Store } from '../schema';

export default class StoreService extends ServiceBase {
  static messagePrefix = 'No store found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(Store, info, acl, sessionToken);

  static read = async (id, criteria, sessionToken) =>
    ServiceBase.read(Store, id, sessionToken, StoreService.messagePrefix, query => StoreService.buildIncludeQuery(query, criteria));

  static read = async (id, criteria, sessionToken) => ServiceBase.read(Store, id, sessionToken, StoreService.messagePrefix);

  static read = async (id, sessionToken) => ServiceBase.read(Store, id, sessionToken, StoreService.messagePrefix);

  static update = async (info, sessionToken) => ServiceBase.update(Store, info, sessionToken, StoreService.messagePrefix);

  static delete = async (id, sessionToken) => ServiceBase.delete(Store, id, sessionToken, StoreService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(Store, StoreService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(Store, StoreService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(StoreService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(StoreService.buildSearchQuery, criteria, sessionToken);

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    if (criteria.has('includeParentStore')) {
      const value = criteria.get('includeParentStore');

      if (value) {
        query.include('parentStore');
      }
    }

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(Store, criteria);
    const query = StoreService.buildIncludeQuery(queryWithoutIncludes, criteria);

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

    ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'name');

    if (conditions.has('imageUrl')) {
      const value = conditions.get('imageUrl');

      if (value) {
        query.equalTo('imageUrl', value);
      }
    }

    if (conditions.has('address')) {
      const value = conditions.get('address');

      if (value) {
        query.equalTo('address', value);
      }
    }

    ServiceBase.addGeoLocationSearchToQuery(conditions, query, 'geoLocation', 'geoLocation');

    if (conditions.has('parentStore')) {
      const value = conditions.get('parentStore');

      if (value) {
        query.equalTo('parentStore', value);
      }
    }

    if (conditions.has('parentStoreId')) {
      const value = conditions.get('parentStoreId');

      if (value) {
        query.equalTo('parentStore', Store.createWithoutData(value));
      }
    }

    return query;
  };
}
