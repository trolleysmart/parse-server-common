// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { Store, MasterProduct, StoreMasterProduct, StoreTag } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class StoreMasterProductService {
  static create = async (info) => {
    const result = await StoreMasterProduct.spawn(info).save();

    return result.id;
  };

  static read = async (id) => {
    const results = await ParseWrapperService.createQuery(StoreMasterProduct).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No store master product found with Id: ${id}`);
    }

    return new StoreMasterProduct(results[0]).getInfo();
  };

  static update = async (info) => {
    const results = await ParseWrapperService.createQuery(StoreMasterProduct).equalTo('objectId', info.get('id')).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No store master product found with Id: ${info.get('id')}`);
    } else {
      const object = new StoreMasterProduct(results[0]);

      await object.updateInfo(info).saveObject();

      return object.getId();
    }
  };

  static delete = async (id) => {
    const results = await ParseWrapperService.createQuery(StoreMasterProduct).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No store master product found with Id: ${id}`);
    } else {
      await results[0].destroy();
    }
  };

  static search = async (criteria) => {
    const results = await StoreMasterProductService.buildSearchQuery(criteria).find();

    return Immutable.fromJS(results).map(_ => new StoreMasterProduct(_).getInfo());
  };

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = StoreMasterProductService.buildSearchQuery(criteria).each(_ => event.raise(new StoreMasterProduct(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria) => {
    const total = await StoreMasterProductService.count(criteria);

    return total > 0;
  };

  static count = async criteria => StoreMasterProductService.buildSearchQuery(criteria).count();

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

    if (conditions.has('description')) {
      const value = conditions.get('description');

      if (value) {
        query.equalTo('lowerCaseDescription', value.toLowerCase());
      }
    }

    if (conditions.has('startsWith_description')) {
      const value = conditions.get('startsWith_description');

      if (value) {
        query.startsWith('lowerCaseDescription', value.toLowerCase());
      }
    }

    if (conditions.has('contains_description')) {
      const value = conditions.get('contains_description');

      if (value) {
        query.contains('lowerCaseDescription', value.toLowerCase());
      }
    }

    if (conditions.has('contains_descriptions')) {
      const values = conditions.get('contains_descriptions');

      if (values && values.count() === 1) {
        query.contains('lowerCaseDescription', values.first().toLowerCase());
      } else if (values && values.count() > 1) {
        query.matches('lowerCaseDescription', values.map(value => `(?=.*${value.toLowerCase()})`).reduce((reduction, value) => reduction + value));
      }
    }

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
