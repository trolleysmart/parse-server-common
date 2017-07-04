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

    ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'name');
    ServiceBase.addStringSearchToQuery(conditions, query, 'storeName', 'storeName');

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

    const tagQuery = MasterProductPriceService.buildMasterProductQuery(conditions);

    if (tagQuery) {
      query.matchesQuery('masterProduct', tagQuery);
    }

    return query;
  };

  static buildMasterProductQuery = (conditions) => {
    const query = ParseWrapperService.createQuery(MasterProduct);
    let hasTags = false;

    if (conditions.has('tag')) {
      const value = conditions.get('tag');

      if (value) {
        query.equalTo('tags', value);
        hasTags = true;
      }
    }

    if (conditions.has('tags')) {
      const value = conditions.get('tags');

      if (value) {
        query.containedIn('tags', value.toArray());
        hasTags = true;
      }
    }

    if (conditions.has('tagId')) {
      const value = conditions.get('tagId');

      if (value) {
        query.equalTo('tags', Tag.createWithoutData(value));
        hasTags = true;
      }
    }

    if (conditions.has('tagIds')) {
      const value = conditions.get('tagIds');

      if (value) {
        query.containedIn('tags', value.map(tagId => Tag.createWithoutData(tagId)).toArray());
        hasTags = true;
      }
    }

    const hasDescriptions = ServiceBase.addStringSearchToQuery(conditions, query, 'description', 'lowerCaseDescription');

    if (hasDescriptions || hasTags) {
      return query;
    }

    return null;
  };
}
