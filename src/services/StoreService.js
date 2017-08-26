// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { Store } from '../schema';

export default class StoreService extends ServiceBase {
  constructor() {
    super(Store, StoreService.buildSearchQuery, StoreService.buildIncludeQuery, 'store');
  }

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
