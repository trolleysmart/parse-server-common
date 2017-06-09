// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { MasterProduct, MasterProductPrice, Store } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class MasterProductPriceService {
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
    const total = await MasterProductPriceService.buildSearchQuery(criteria).count();

    return total > 0;
  };

  static count = async criteria => MasterProductPriceService.buildSearchQuery(criteria).count();

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(MasterProductPrice, criteria);

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

    if (conditions.has('capturedDate')) {
      const value = conditions.get('capturedDate');

      if (value) {
        query.equalTo('capturedDate', value);
      }
    }

    if (conditions.has('lessThanOrEqualTo_capturedDate')) {
      const value = conditions.get('lessThanOrEqualTo_capturedDate');

      if (value) {
        query.lessThanOrEqualTo('capturedDate', value);
      }
    }

    if (conditions.has('greaterThanOrEqualTo_capturedDate')) {
      const value = conditions.get('greaterThanOrEqualTo_capturedDate');

      if (value) {
        query.greaterThanOrEqualTo('capturedDate', value);
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

    if (conditions.has('description')) {
      const value = conditions.get('description');

      if (value) {
        query.equalTo('description', value.toLowerCase());
      }
    }

    if (conditions.has('startsWith_description')) {
      const value = conditions.get('startsWith_description');

      if (value) {
        query.startsWith('description', value.toLowerCase());
      }
    }

    if (conditions.has('contains_description')) {
      const value = conditions.get('contains_description');

      if (value) {
        query.contains('description', value.toLowerCase());
      }
    }

    if (conditions.has('contains_descriptions')) {
      const values = conditions.get('contains_descriptions');

      if (values && values.count() === 1) {
        query.contains('description', values.first().toLowerCase());
      } else if (values && values.count() > 1) {
        query.matches('description', values.map(value => `(?=.*${value.toLowerCase()})`).reduce((reduction, value) => reduction + value));
      }
    }

    if (conditions.has('storeName')) {
      const value = conditions.get('storeName');

      if (value) {
        query.equalTo('storeName', value);
      }
    }

    if (conditions.has('startsWith_storeName')) {
      const value = conditions.get('startsWith_storeName');

      if (value) {
        query.startsWith('storeName', value);
      }
    }

    if (conditions.has('contains_storeName')) {
      const value = conditions.get('contains_storeName');

      if (value) {
        query.contains('storeName', value);
      }
    }

    if (conditions.has('contains_storeNames')) {
      const values = conditions.get('contains_storeNames');

      if (values && values.count() === 1) {
        query.contains('storeName', values.first().toLowerCase());
      } else if (values && values.count() > 1) {
        query.matches('storeName', values.map(value => `(?=.*${value.toLowerCase()})`).reduce((reduction, value) => reduction + value));
      }
    }

    return query;
  };
}
