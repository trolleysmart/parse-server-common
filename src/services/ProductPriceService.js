// @flow

import { ParseWrapperService, ServiceBase } from 'micro-business-parse-server-common';
import { ProductPrice, Store, Tag } from '../schema';

export default class ProductPriceService extends ServiceBase {
  messagePrefix = 'No product price found with Id: ';

  create = async (info, acl, sessionToken) => this.create(ProductPrice, info, acl, sessionToken);

  read = async (id, sessionToken) => this.read(ProductPrice, id, sessionToken, ProductPriceService.messagePrefix);

  update = async (info, sessionToken) => this.update(ProductPrice, info, sessionToken, ProductPriceService.messagePrefix);

  delete = async (id, sessionToken) => this.delete(ProductPrice, id, sessionToken, ProductPriceService.messagePrefix);

  search = async (criteria, sessionToken) => this.search(ProductPrice, ProductPriceService.buildSearchQuery, criteria, sessionToken);

  searchAll = (criteria, sessionToken) => this.searchAll(ProductPrice, ProductPriceService.buildSearchQuery, criteria, sessionToken);

  count = async (criteria, sessionToken) => this.count(ProductPriceService.buildSearchQuery, criteria, sessionToken);

  exists = async (criteria, sessionToken) => this.exists(ProductPriceService.buildSearchQuery, criteria, sessionToken);

  buildSearchQuery = (criteria) => {
    if (!criteria.has('conditions')) {
      return this.buildSearchQueryInternal(criteria);
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('storeIds')) {
      const storeIds = conditions.get('storeIds');

      if (storeIds.isEmpty()) {
        return this.buildSearchQueryInternal(criteria);
      } else if (storeIds.count() === 1) {
        return this.buildSearchQueryInternal(criteria.setIn(['conditions', 'storeId'], storeIds.first()));
      }

      const queryWithoutStandardCriteriaAdded = ParseWrapperService.createOrQuery(
        storeIds.map(storeId => this.buildSearchQueryInternal(criteria.setIn(['conditions', 'storeId'], storeId))),
      );

      const query = ParseWrapperService.addStandardCriteriaToQuery(ProductPrice, queryWithoutStandardCriteriaAdded, criteria);

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
    }

    return this.buildSearchQueryInternal(criteria);
  };

  buildSearchQueryInternal = (criteria) => {
    const query = ParseWrapperService.createQuery(ProductPrice, criteria);

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

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    this.addStringSearchToQuery(conditions, query, 'name', 'name');
    this.addStringSearchToQuery(conditions, query, 'description', 'description');

    if (conditions.has('priceToDisplay')) {
      const value = conditions.get('priceToDisplay');

      if (value) {
        query.equalTo('priceToDisplay', value);
      }
    }

    if (conditions.has('lessThanOrEqualTo_priceToDisplay')) {
      const value = conditions.get('lessThanOrEqualTo_priceToDisplay');

      if (value) {
        query.lessThanOrEqualTo('priceToDisplay', value);
      }
    }

    if (conditions.has('greaterThanOrEqualTo_priceToDisplay')) {
      const value = conditions.get('greaterThanOrEqualTo_priceToDisplay');

      if (value) {
        query.greaterThanOrEqualTo('priceToDisplay', value);
      }
    }

    if (conditions.has('saving')) {
      const value = conditions.get('saving');

      if (value) {
        query.equalTo('saving', value);
      }
    }

    if (conditions.has('lessThanOrEqualTo_saving')) {
      const value = conditions.get('lessThanOrEqualTo_saving');

      if (value) {
        query.lessThanOrEqualTo('saving', value);
      }
    }

    if (conditions.has('greaterThanOrEqualTo_saving')) {
      const value = conditions.get('greaterThanOrEqualTo_saving');

      if (value) {
        query.greaterThanOrEqualTo('saving', value);
      }
    }

    if (conditions.has('savingPercentage')) {
      const value = conditions.get('savingPercentage');

      if (value) {
        query.equalTo('savingPercentage', value);
      }
    }

    if (conditions.has('lessThanOrEqualTo_savingPercentage')) {
      const value = conditions.get('lessThanOrEqualTo_savingPercentage');

      if (value) {
        query.lessThanOrEqualTo('savingPercentage', value);
      }
    }

    if (conditions.has('greaterThanOrEqualTo_savingPercentage')) {
      const value = conditions.get('greaterThanOrEqualTo_savingPercentage');

      if (value) {
        query.greaterThanOrEqualTo('savingPercentage', value);
      }
    }

    if (conditions.has('offerEndDate')) {
      const value = conditions.get('offerEndDate');

      if (value) {
        query.equalTo('offerEndDate', value);
      }
    }

    if (conditions.has('lessThanOrEqualTo_offerEndDate')) {
      const value = conditions.get('lessThanOrEqualTo_offerEndDate');

      if (value) {
        query.lessThanOrEqualTo('offerEndDate', value);
      }
    }

    if (conditions.has('greaterThanOrEqualTo_offerEndDate')) {
      const value = conditions.get('greaterThanOrEqualTo_offerEndDate');

      if (value) {
        query.greaterThanOrEqualTo('offerEndDate', value);
      }
    }

    if (conditions.has('status')) {
      const value = conditions.get('status');

      if (value) {
        query.equalTo('status', value);
      }
    }

    if (conditions.has('specialType')) {
      const value = conditions.get('specialType');

      if (value) {
        query.equalTo('priceDetails.specialType', value);
      }
    }

    if (conditions.has('not_specialType')) {
      const value = conditions.get('not_specialType');

      if (value) {
        query.notEqualTo('priceDetails.specialType', value);
      }
    }

    if (conditions.has('storeId')) {
      const value = conditions.get('storeId');

      if (value) {
        query.equalTo('store', Store.createWithoutData(value));
      }
    }

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
