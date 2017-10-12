// @flow

import { List } from 'immutable';
import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { CrawledProductPrice, Store, CrawledStoreProduct, Tag } from '../schema';

export default class CrawledProductPriceService extends ServiceBase {
  static fields = List.of(
    'name',
    'description',
    'priceDetails',
    'priceToDisplay',
    'saving',
    'savingPercentage',
    'offerEndDate',
    'status',
    'special',
    'barcode',
    'size',
    'imageUrl',
    'productPageUrl',
    'store',
    'tags',
    'crawledStoreProduct',
  );

  constructor() {
    super(CrawledProductPrice, CrawledProductPriceService.buildSearchQuery, CrawledProductPriceService.buildIncludeQuery, 'product price');
  }

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    ServiceBase.addIncludeQuery(criteria, query, 'store');
    ServiceBase.addIncludeQuery(criteria, query, 'tags');
    ServiceBase.addIncludeQuery(criteria, query, 'crawledStoreProduct');

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(CrawledProductPrice, criteria);
    const query = CrawledProductPriceService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    CrawledProductPriceService.fields.forEach((field) => {
      ServiceBase.addExistenceQuery(conditions, query, field);
    });
    ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
    ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
    ServiceBase.addNumberQuery(conditions, query, 'priceToDisplay', 'priceToDisplay');
    ServiceBase.addNumberQuery(conditions, query, 'saving', 'saving');
    ServiceBase.addNumberQuery(conditions, query, 'savingPercentage', 'savingPercentage');
    ServiceBase.addDateTimeQuery(conditions, query, 'offerEndDate', 'offerEndDate');
    ServiceBase.addEqualityQuery(conditions, query, 'status', 'status');
    ServiceBase.addEqualityQuery(conditions, query, 'special', 'special');
    ServiceBase.addEqualityQuery(conditions, query, 'barcode', 'barcode');
    ServiceBase.addEqualityQuery(conditions, query, 'size', 'size');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');
    ServiceBase.addEqualityQuery(conditions, query, 'productPageUrl', 'productPageUrl');
    ServiceBase.addLinkQuery(conditions, query, 'store', 'store', Store);
    ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', Tag);
    ServiceBase.addLinkQuery(conditions, query, 'crawledStoreProduct', 'crawledStoreProduct', CrawledStoreProduct);

    return query;
  };
}
