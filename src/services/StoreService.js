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

    ServiceBase.addIncludeQuery(criteria, query, 'parentStore');

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(Store, criteria);
    const query = StoreService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addEqualityQuery(conditions, query, 'key', 'key');
    ServiceBase.addStringQuery(conditions, query, 'name', 'name');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
    ServiceBase.addEqualityQuery(conditions, query, 'address', 'address');
    ServiceBase.addGeoLocationQuery(conditions, query, 'geoLocation', 'geoLocation');
    ServiceBase.addLinkQuery(conditions, query, 'parentStore', 'parentStore', Store);

    return query;
  };
}
