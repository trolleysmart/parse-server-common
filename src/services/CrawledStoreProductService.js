// @flow

import { List } from 'immutable';
import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { CrawledStoreProduct, Store, StoreTag } from '../schema';

export default class CrawledStoreProductService extends ServiceBase {
  static fields = List.of('name', 'description', 'barcode', 'productPageUrl', 'imageUrl', 'size', 'lastCrawlDateTime', 'store', 'storeTags');

  constructor() {
    super(CrawledStoreProduct, CrawledStoreProductService.buildSearchQuery, CrawledStoreProductService.buildIncludeQuery, 'store product');
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
    const queryWithoutIncludes = ParseWrapperService.createQuery(CrawledStoreProduct, criteria);
    const query = CrawledStoreProductService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    CrawledStoreProductService.fields.forEach((field) => {
      ServiceBase.addExistenceQuery(conditions, query, field);
    });
    ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
    ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
    ServiceBase.addEqualityQuery(conditions, query, 'barcode', 'barcode');
    ServiceBase.addEqualityQuery(conditions, query, 'productPageUrl', 'productPageUrl');
    ServiceBase.addStringQuery(conditions, query, 'productPageUrl', 'productPageUrl');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
    ServiceBase.addEqualityQuery(conditions, query, 'size', 'size');
    ServiceBase.addDateTimeQuery(conditions, query, 'lastCrawlDateTime', 'lastCrawlDateTime');
    ServiceBase.addLinkQuery(conditions, query, 'store', 'store', Store);
    ServiceBase.addLinkQuery(conditions, query, 'storeTag', 'storeTags', StoreTag);

    return query;
  };
}
