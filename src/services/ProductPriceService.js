// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { ProductPrice, Store, StoreProduct, Tag } from '../schema';

export default class ProductPriceService extends ServiceBase {
  static messagePrefix = 'No product price found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(ProductPrice, info, acl, sessionToken);

  static read = async (id, criteria, sessionToken) =>
    ServiceBase.read(ProductPrice, id, sessionToken, ProductPriceService.messagePrefix, query =>
      ProductPriceService.buildIncludeQuery(query, criteria),
    );

  static update = async (info, sessionToken) => ServiceBase.update(ProductPrice, info, sessionToken, ProductPriceService.messagePrefix);

  static delete = async (id, sessionToken) => ServiceBase.delete(ProductPrice, id, sessionToken, ProductPriceService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(ProductPrice, ProductPriceService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(ProductPrice, ProductPriceService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(ProductPriceService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(ProductPriceService.buildSearchQuery, criteria, sessionToken);

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    if (criteria.has('includeStore')) {
      const value = criteria.get('includeStore');

      if (value) {
        query.include('store');
      }
    }

    if (criteria.has('includeTags')) {
      const value = criteria.get('includeTags');

      if (value) {
        query.include('tags');
      }
    }

    if (criteria.has('includeStoreProduct')) {
      const value = criteria.get('includeStoreProduct');

      if (value) {
        query.include('storeProduct');
      }
    }

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(ProductPrice, criteria);
    const query = ProductPriceService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    ServiceBase.addStringQuery(conditions, query, 'name', 'name');
    ServiceBase.addStringQuery(conditions, query, 'description', 'description');
    ServiceBase.addNumberQuery(conditions, query, 'priceToDisplay', 'priceToDisplay');
    ServiceBase.addNumberQuery(conditions, query, 'saving', 'saving');
    ServiceBase.addNumberQuery(conditions, query, 'savingPercentage', 'savingPercentage');
    ServiceBase.addDateTimeQuery(conditions, query, 'offerEndDate', 'offerEndDate');
    ServiceBase.addEqualityQuery(conditions, query, 'status', 'status');
    ServiceBase.addEqualityQuery(conditions, query, 'special', 'special');
    ServiceBase.addLinkQuery(conditions, query, 'store', 'store', Store);
    ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', Tag);
    ServiceBase.addLinkQuery(conditions, query, 'storeProduct', 'storeProduct', StoreProduct);

    return query;
  };
}
