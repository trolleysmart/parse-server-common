// @flow

import { ParseWrapperService } from 'micro-business-parse-server-common';
import { MasterProduct, MasterProductPrice, Store, Tag } from '../schema';
import ServiceBase from './ServiceBase';

export default class MasterProductPriceService extends ServiceBase {
  static messagePrefix = 'No master product price found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(MasterProductPrice, info, acl, sessionToken);

  static read = async (info, sessionToken) => ServiceBase.read(MasterProductPrice, info, sessionToken, MasterProductPriceService.messagePrefix);

  static update = async (info, sessionToken) => ServiceBase.update(MasterProductPrice, info, sessionToken, MasterProductPriceService.messagePrefix);

  static delete = async (info, sessionToken) => ServiceBase.delete(MasterProductPrice, info, sessionToken, MasterProductPriceService.messagePrefix);

  static search = async (criteria, sessionToken) =>
    ServiceBase.search(MasterProductPrice, MasterProductPriceService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) =>
    ServiceBase.searchAll(MasterProductPrice, MasterProductPriceService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(MasterProductPriceService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(MasterProductPriceService.buildSearchQuery, criteria, sessionToken);

  static buildSearchQuery = (criteria) => {
    if (!criteria.has('conditions')) {
      return MasterProductPriceService.buildSearchQueryInternal(criteria);
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('storeIds')) {
      const storeIds = conditions.get('storeIds');

      if (storeIds.isEmpty()) {
        return MasterProductPriceService.buildSearchQueryInternal(criteria);
      } else if (storeIds.count() === 1) {
        return MasterProductPriceService.buildSearchQueryInternal(criteria.setIn(['conditions', 'storeId'], storeIds.first()));
      }

      const queryWithoutStandardCriteriaAdded = ParseWrapperService.createOrQuery(
        storeIds.map(storeId => MasterProductPriceService.buildSearchQueryInternal(criteria.setIn(['conditions', 'storeId'], storeId))),
      );

      const query = ParseWrapperService.addStandardCriteriaToQuery(MasterProductPrice, queryWithoutStandardCriteriaAdded, criteria);

      if (criteria.has('includeMasterProduct')) {
        const value = criteria.get('includeMasterProduct');

        if (value) {
          query.include('masterProduct');
        }
      }

      if (criteria.has('includeStore')) {
        const value = criteria.get('includeStore');

        if (value) {
          query.include('store');
        }
      }

      return query;
    }

    return MasterProductPriceService.buildSearchQueryInternal(criteria);
  };

  static buildSearchQueryInternal = (criteria) => {
    const query = ParseWrapperService.createQuery(MasterProductPrice, criteria);

    if (criteria.has('includeMasterProduct')) {
      const value = criteria.get('includeMasterProduct');

      if (value) {
        query.include('masterProduct');
      }
    }

    if (criteria.has('includeStore')) {
      const value = criteria.get('includeStore');

      if (value) {
        query.include('store');
      }
    }

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

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

    if (conditions.has('firstCrawledDate')) {
      const value = conditions.get('firstCrawledDate');

      if (value) {
        query.equalTo('firstCrawledDate', value);
      }
    }

    if (conditions.has('lessThanOrEqualTo_firstCrawledDate')) {
      const value = conditions.get('lessThanOrEqualTo_firstCrawledDate');

      if (value) {
        query.lessThanOrEqualTo('firstCrawledDate', value);
      }
    }

    if (conditions.has('greaterThanOrEqualTo_firstCrawledDate')) {
      const value = conditions.get('greaterThanOrEqualTo_firstCrawledDate');

      if (value) {
        query.greaterThanOrEqualTo('firstCrawledDate', value);
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

    if (conditions.has('masterProductId')) {
      const value = conditions.get('masterProductId');

      if (value) {
        query.equalTo('masterProduct', MasterProduct.createWithoutData(value));
      }
    }

    if (conditions.has('storeId')) {
      const value = conditions.get('storeId');

      if (value) {
        query.equalTo('store', Store.createWithoutData(value));
      }
    }

    ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'name');
    ServiceBase.addStringSearchToQuery(conditions, query, 'storeName', 'storeName');

    const masterProductQuery = MasterProductPriceService.buildMasterProductQuery(conditions);

    if (masterProductQuery) {
      query.matchesQuery('masterProduct', masterProductQuery);
    }

    return query;
  };

  static buildMasterProductQuery = (conditions) => {
    const query = ParseWrapperService.createQuery(MasterProduct);
    let hasTagsQuery = false;

    if (conditions.has('tag')) {
      const value = conditions.get('tag');

      if (value) {
        query.equalTo('tags', value);
        hasTagsQuery = true;
      }
    }

    if (conditions.has('tags')) {
      const value = conditions.get('tags');

      if (value) {
        query.containedIn('tags', value.toArray());
        hasTagsQuery = true;
      }
    }

    if (conditions.has('tagId')) {
      const value = conditions.get('tagId');

      if (value) {
        query.equalTo('tags', Tag.createWithoutData(value));
        hasTagsQuery = true;
      }
    }

    if (conditions.has('tagIds')) {
      const value = conditions.get('tagIds');

      if (value) {
        query.containedIn('tags', value.map(tagId => Tag.createWithoutData(tagId)).toArray());
        hasTagsQuery = true;
      }
    }

    const hasDescriptionsQuery = ServiceBase.addStringSearchToQuery(conditions, query, 'description', 'lowerCaseDescription');

    if (hasDescriptionsQuery || hasTagsQuery) {
      return query;
    }

    return null;
  };
}
