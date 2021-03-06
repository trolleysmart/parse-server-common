// @flow

import { List } from 'immutable';
import { ParseWrapperService, ServiceBase } from '@microbusiness/parse-server-common';
import { StoreProduct, Store, StoreTag, Tag } from '../schema';

export default class StoreProductService extends ServiceBase {
  static fields = List.of(
    'name',
    'description',
    'barcode',
    'productPageUrl',
    'imageUrl',
    'size',
    'lastCrawlDateTime',
    'store',
    'storeTags',
    'tags',
    'createdByCrawler',
    'authorizedToDisplay',
  );

  constructor() {
    super(StoreProduct, StoreProductService.buildSearchQuery, StoreProductService.buildIncludeQuery, 'store product');
  }

  static buildIncludeQuery = (query, criteria) => {
    if (!criteria) {
      return query;
    }

    ServiceBase.addIncludeQuery(criteria, query, 'store');
    ServiceBase.addIncludeQuery(criteria, query, 'storeTags');
    ServiceBase.addIncludeQuery(criteria, query, 'tags');

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(StoreProduct, criteria);
    const query = StoreProductService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    StoreProductService.fields.forEach((field) => {
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
    ServiceBase.addLinkQuery(conditions, query, 'tag', 'tags', Tag);
    ServiceBase.addEqualityQuery(conditions, query, 'createdByCrawler', 'createdByCrawler');
    ServiceBase.addEqualityQuery(conditions, query, 'authorizedToDisplay', 'authorizedToDisplay');

    return query;
  };
}
