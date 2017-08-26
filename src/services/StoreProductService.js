// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { StoreProduct, Store, StoreTag } from '../schema';

export default class StoreProductService extends ServiceBase {
  static messagePrefix = 'No store product found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(StoreProduct, info, acl, sessionToken);

  static read = async (id, criteria, sessionToken) =>
    ServiceBase.read(StoreProduct, id, sessionToken, StoreProductService.messagePrefix, query =>
      StoreProductService.buildIncludeQuery(query, criteria),
    );

  static update = async (info, sessionToken) => ServiceBase.update(StoreProduct, info, sessionToken, StoreProductService.messagePrefix);

  static delete = async (id, sessionToken) => ServiceBase.delete(StoreProduct, id, sessionToken, StoreProductService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(StoreProduct, StoreProductService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(StoreProduct, StoreProductService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(StoreProductService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(StoreProductService.buildSearchQuery, criteria, sessionToken);

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    ServiceBase.addIncludeQuery(criteria, query, 'store');
    ServiceBase.addIncludeQuery(criteria, query, 'storeTags');

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(StoreProduct, criteria);
    const query = StoreProductService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addStringQuery(conditions, query, 'name', 'name');
    ServiceBase.addStringQuery(conditions, query, 'description', 'description');
    ServiceBase.addEqualityQuery(conditions, query, 'barcode', 'barcode');
    ServiceBase.addEqualityQuery(conditions, query, 'productPageUrl', 'productPageUrl');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
    ServiceBase.addEqualityQuery(conditions, query, 'size', 'size');
    ServiceBase.addDateTimeQuery(conditions, query, 'lastCrawlDateTime', 'lastCrawlDateTime');
    ServiceBase.addLinkQuery(conditions, query, 'store', 'store', Store);
    ServiceBase.addLinkQuery(conditions, query, 'storeTag', 'storeTags', StoreTag);

    return query;
  };
}
