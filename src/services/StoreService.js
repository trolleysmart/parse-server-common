// @flow

import { List } from 'immutable';
import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { Store } from '../schema';

export default class StoreService extends ServiceBase {
    static fields = List.of(
      'key',
      'name',
      'imageUrl',
      'address',
      'phones',
      'geoLocation',
      'openFrom',
      'openUntil',
      'forDisplay',
      'parentStore',
      'ownedByUser',
      'maintainedByUsers',
      'status',
    );

    constructor() {
      super(Store, StoreService.buildSearchQuery, StoreService.buildIncludeQuery, 'store');
    }

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    ServiceBase.addIncludeQuery(criteria, query, 'parentStore');
    ServiceBase.addIncludeQuery(criteria, query, 'ownedByUser');
    ServiceBase.addIncludeQuery(criteria, query, 'maintainedByUsers');

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(Store, criteria);
    const query = StoreService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    StoreService.fields.forEach((field) => {
      ServiceBase.addExistenceQuery(conditions, query, field);
    });
    ServiceBase.addEqualityQuery(conditions, query, 'key', 'key');
    ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
    ServiceBase.addEqualityQuery(conditions, query, 'address', 'address');
    ServiceBase.addGeoLocationQuery(conditions, query, 'geoLocation', 'geoLocation');
    ServiceBase.addDateTimeQuery(conditions, query, 'openFrom', 'openFrom');
    ServiceBase.addDateTimeQuery(conditions, query, 'openUntil', 'openUntil');
    ServiceBase.addEqualityQuery(conditions, query, 'forDisplay', 'forDisplay');
    ServiceBase.addLinkQuery(conditions, query, 'parentStore', 'parentStore', Store);
    ServiceBase.addUserLinkQuery(conditions, query, 'ownedByUser', 'ownedByUser');
    ServiceBase.addUserLinkQuery(conditions, query, 'maintainedByUser', 'maintainedByUsers');
    ServiceBase.addEqualityQuery(conditions, query, 'status', 'status');

    return query;
  };
}
