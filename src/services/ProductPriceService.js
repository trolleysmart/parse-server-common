// @flow

import { List } from 'immutable';
import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { ProductPrice, Store, StoreProduct, Tag } from '../schema';

export default class ProductPriceService extends ServiceBase {
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
    'store',
    'tags',
    'storeProduct',
  );

  constructor() {
    super(ProductPrice, ProductPriceService.buildSearchQuery, ProductPriceService.buildIncludeQuery, 'product price');
  }

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    ServiceBase.addIncludeQuery(criteria, query, 'store');
    ServiceBase.addIncludeQuery(criteria, query, 'tags');
    ServiceBase.addIncludeQuery(criteria, query, 'storeProduct');

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(ProductPrice, criteria);
    const query = ProductPriceService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ProductPriceService.fields.forEach((field) => {
      ServiceBase.addExistenceQuery(conditions, query, field);
    });
    ServiceBase.addStringQuery(conditions, query, 'name', 'name');
    ServiceBase.addStringQuery(conditions, query, 'description', 'description');
    ServiceBase.addNumberQuery(conditions, query, 'priceToDisplay', 'priceToDisplay');
    ServiceBase.addNumberQuery(conditions, query, 'saving', 'saving');
    ServiceBase.addNumberQuery(conditions, query, 'savingPercentage', 'savingPercentage');
    ServiceBase.addDateTimeQuery(conditions, query, 'offerEndDate', 'offerEndDate');
    ServiceBase.addEqualityQuery(conditions, query, 'status', 'status');
    ServiceBase.addEqualityQuery(conditions, query, 'special', 'special');
    ServiceBase.addEqualityQuery(conditions, query, 'barcode', 'barcode');
    ServiceBase.addEqualityQuery(conditions, query, 'size', 'size');
    ServiceBase.addLinkQuery(conditions, query, 'store', 'store', Store);
    ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', Tag);
    ServiceBase.addLinkQuery(conditions, query, 'storeProduct', 'storeProduct', StoreProduct);

    return query;
  };
}
