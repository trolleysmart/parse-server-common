// @flow

import { ParseWrapperService } from 'micro-business-parse-server-common';
import { Store, MasterProduct, StoreMasterProduct, StoreTag } from '../schema';
import ServiceBase from './ServiceBase';

export default class StoreMasterProductService extends ServiceBase {
  static messagePrefix = 'No store master product found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(StoreMasterProduct, info, acl, sessionToken);

  static read = async (info, sessionToken) => ServiceBase.read(StoreMasterProduct, info, sessionToken, StoreMasterProductService.messagePrefix);

  static update = async (info, sessionToken) => ServiceBase.update(StoreMasterProduct, info, sessionToken, StoreMasterProductService.messagePrefix);

  static delete = async (info, sessionToken) => ServiceBase.delete(StoreMasterProduct, info, sessionToken, StoreMasterProductService.messagePrefix);

  static search = async (criteria, sessionToken) =>
    ServiceBase.search(StoreMasterProduct, StoreMasterProductService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) =>
    ServiceBase.searchAll(StoreMasterProduct, StoreMasterProductService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(StoreMasterProductService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(StoreMasterProductService.buildSearchQuery, criteria, sessionToken);

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(StoreMasterProduct, criteria);

    if (criteria.has('includeStoreTags')) {
      const value = criteria.get('includeStoreTags');

      if (value) {
        query.include('storeTags');
      }
    }

    if (criteria.has('includeStore')) {
      const value = criteria.get('includeStore');

      if (value) {
        query.include('store');
      }
    }

    if (criteria.has('includeMasterProduct')) {
      const value = criteria.get('includeMasterProduct');

      if (value) {
        query.include('masterProduct');
      }
    }

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('key')) {
      const value = conditions.get('key');

      if (value) {
        query.equalTo('key', value);
      }
    }

    ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');

    if (conditions.has('with_name')) {
      const value = conditions.get('with_name');

      if (value) {
        query.exists('name');
      }
    }

    if (conditions.has('without_name')) {
      const value = conditions.get('without_name');

      if (value) {
        query.doesNotExist('name');
      }
    }

    ServiceBase.addStringSearchToQuery(conditions, query, 'description', 'lowerCaseDescription');

    if (conditions.has('barcode')) {
      const value = conditions.get('barcode');

      if (value) {
        query.equalTo('barcode', value);
      }
    }

    if (conditions.has('productPageUrl')) {
      const value = conditions.get('productPageUrl');

      if (value) {
        query.equalTo('productPageUrl', value);
      }
    }

    if (conditions.has('imageUrl')) {
      const value = conditions.get('imageUrl');

      if (value) {
        query.equalTo('imageUrl', value);
      }
    }

    if (conditions.has('size')) {
      const value = conditions.get('size');

      if (value) {
        query.equalTo('size', value);
      }
    }

    if (conditions.has('lastCrawlDateTime')) {
      const value = conditions.get('lastCrawlDateTime');

      if (value) {
        query.equalTo('lastCrawlDateTime', value);
      }
    }

    if (conditions.has('lessThanOrEqualTo_lastCrawlDateTime')) {
      const value = conditions.get('lessThanOrEqualTo_lastCrawlDateTime');

      if (value) {
        query.lessThanOrEqualTo('lastCrawlDateTime', value);
      }
    }

    if (conditions.has('greaterThanOrEqualTo_lastCrawlDateTime')) {
      const value = conditions.get('greaterThanOrEqualTo_lastCrawlDateTime');

      if (value) {
        query.greaterThanOrEqualTo('lastCrawlDateTime', value);
      }
    }

    if (conditions.has('storeTag')) {
      const value = conditions.get('storeTag');

      if (value) {
        query.equalTo('storeTags', value);
      }
    }

    if (conditions.has('storeTags')) {
      const value = conditions.get('storeTags');

      if (value) {
        query.containedIn('storeTags', value.toArray());
      }
    }

    if (conditions.has('storeTagId')) {
      const value = conditions.get('storeTagId');

      if (value) {
        query.equalTo('storeTags', StoreTag.createWithoutData(value));
      }
    }

    if (conditions.has('storeTagIds')) {
      const value = conditions.get('storeTagIds');

      if (value) {
        query.containedIn('storeTags', value.map(storeTagId => StoreTag.createWithoutData(storeTagId)).toArray());
      }
    }

    if (conditions.has('store')) {
      const value = conditions.get('store');

      if (value) {
        query.equalTo('store', value);
      }
    }

    if (conditions.has('storeId')) {
      const value = conditions.get('storeId');

      if (value) {
        query.equalTo('store', Store.createWithoutData(value));
      }
    }

    if (conditions.has('with_masterProduct')) {
      const value = conditions.get('with_masterProduct');

      if (value) {
        query.exists('masterProduct');
      }
    }

    if (conditions.has('without_masterProduct')) {
      const value = conditions.get('without_masterProduct');

      if (value) {
        query.doesNotExist('masterProduct');
      }
    }

    if (conditions.has('masterProduct')) {
      const value = conditions.get('masterProduct');

      if (value) {
        query.equalTo('masterProduct', value);
      }
    }

    if (conditions.has('masterProductId')) {
      const value = conditions.get('masterProductId');

      if (value) {
        query.equalTo('masterProduct', MasterProduct.createWithoutData(value));
      }
    }

    return query;
  };
}
