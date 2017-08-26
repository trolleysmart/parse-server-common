// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { StoreProduct, Store, StoreTag } from '../schema';

export default class StoreProductService extends ServiceBase {
  constructor() {
    super(StoreProduct, StoreProductService.buildSearchQuery, StoreProductService.buildIncludeQuery, 'store product');
  }

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
