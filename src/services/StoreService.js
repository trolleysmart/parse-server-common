// @flow

import { ParseWrapperService } from 'micro-business-parse-server-common';
import { Store } from '../schema';
import ServiceBase from './ServiceBase';

export default class StoreService extends ServiceBase {
  static messagePrefix = 'No store found with Id: ';

  static create = async (info, acl) => ServiceBase.create(Store, info, acl);

  static read = async (info, sessionToken) => ServiceBase.read(Store, info, sessionToken, StoreService.messagePrefix);

  static update = async (info, sessionToken) => ServiceBase.update(Store, info, sessionToken, StoreService.messagePrefix);

  static delete = async (info, sessionToken) => ServiceBase.delete(Store, info, sessionToken, StoreService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(Store, StoreService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(Store, StoreService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(StoreService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(StoreService.buildSearchQuery, criteria, sessionToken);

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(Store, criteria);
    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');

    return query;
  };
}
