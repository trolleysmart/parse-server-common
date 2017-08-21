// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { ProductPrice, Tag } from '../schema';

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

    return query;
  };

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(ProductPrice, criteria);
    const query = ProductPriceService.buildIncludeQuery(queryWithoutIncludes, criteria);

    const conditions = criteria.get('conditions');

    this.addStringSearchToQuery(conditions, query, 'name', 'name');
    this.addStringSearchToQuery(conditions, query, 'description', 'description');

    if (conditions.has('tag')) {
      const value = conditions.get('tag');

      if (value) {
        query.equalTo('tags', value);
      }
    }

    if (conditions.has('tags')) {
      const value = conditions.get('tags');

      if (value) {
        query.containedIn('tags', value.toArray());
      }
    }

    if (conditions.has('tagId')) {
      const value = conditions.get('tagId');

      if (value) {
        query.equalTo('tags', Tag.createWithoutData(value));
      }
    }

    if (conditions.has('tagIds')) {
      const value = conditions.get('tagIds');

      if (value) {
        query.containedIn('tags', value.map(tagId => Tag.createWithoutData(tagId)).toArray());
      }
    }

    return query;
  };
}
