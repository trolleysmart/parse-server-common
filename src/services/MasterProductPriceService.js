// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { MasterProduct, MasterProductPrice, Store, Tag } from '../schema';
import ServiceBase from './ServiceBase';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class MasterProductPriceService extends ServiceBase {
  static create = async (info) => {
    const result = await MasterProductPrice.spawn(info).save();

    return result.id;
  };

  static read = async (id) => {
    const results = await ParseWrapperService.createQuery(MasterProductPrice).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No master product price found with Id: ${id}`);
    }

    return new MasterProductPrice(results[0]).getInfo();
  };

  static update = async (info) => {
    const results = await ParseWrapperService.createQuery(MasterProductPrice).equalTo('objectId', info.get('id')).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No master product price found with Id: ${info.get('id')}`);
    } else {
      const object = new MasterProductPrice(results[0]);

      await object.updateInfo(info).saveObject();

      return object.getId();
    }
  };

  static delete = async (id) => {
    const results = await ParseWrapperService.createQuery(MasterProductPrice).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No master product price found with Id: ${id}`);
    } else {
      await results[0].destroy();
    }
  };

  static search = async (criteria) => {
    const results = await MasterProductPriceService.buildSearchQuery(criteria).find();

    return Immutable.fromJS(results).map(_ => new MasterProductPrice(_).getInfo());
  };

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = MasterProductPriceService.buildSearchQuery(criteria).each(_ => event.raise(new MasterProductPrice(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria) => {
    const total = await MasterProductPriceService.count(criteria);

    return total > 0;
  };

  static count = async criteria => MasterProductPriceService.buildSearchQuery(criteria).count();

  static buildSearchQuery = (criteria) => {
    if (!criteria.has('conditions')) {
      return MasterProductPriceService.buildSearchQueryInternal(criteria);
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('storeIds')) {
      const value = conditions.get('storeIds');

      if (value.isEmpty()) {
        return MasterProductPriceService.buildSearchQueryInternal(criteria);
      } else if (value.count() === 1) {
        return MasterProductPriceService.buildSearchQueryInternal(criteria.setIn(['conditions', 'storeId'], value.first()));
      }

      return ParseWrapperService.createOrQuery(
        value.map(storeId => MasterProductPriceService.buildSearchQueryInternal(criteria.setIn(['conditions', 'storeId'], storeId))),
      );
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

    const masterProductQuery = MasterProductPriceService.buildMasterProductQuery(conditions);

    if (masterProductQuery) {
      query.matchesQuery('masterProduct', masterProductQuery);
    }

    const storeQuery = MasterProductPriceService.buildStoreQuery(conditions);

    if (storeQuery) {
      query.matchesQuery('store', storeQuery);
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

    const hasNameQuery = ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');
    const hasDescriptionsQuery = ServiceBase.addStringSearchToQuery(conditions, query, 'description', 'lowerCaseDescription');

    if (hasNameQuery || hasDescriptionsQuery || hasTagsQuery) {
      return query;
    }

    return null;
  };

  static buildStoreQuery = (conditions) => {
    const query = ParseWrapperService.createQuery(Store);
    const hasNameQuery = ServiceBase.addStringSearchToQuery(conditions, query, 'storeName', 'lowerCaseName');

    if (hasNameQuery) {
      return query;
    }

    return null;
  };
}
