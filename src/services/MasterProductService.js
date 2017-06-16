// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { MasterProduct, Tag } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class MasterProductService {
  static create = async (info) => {
    const result = await MasterProduct.spawn(info).save();

    return result.id;
  };

  static read = async (id) => {
    const results = await ParseWrapperService.createQuery(MasterProduct).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No master product found with Id: ${id}`);
    }

    return new MasterProduct(results[0]).getInfo();
  };

  static update = async (info) => {
    const results = await ParseWrapperService.createQuery(MasterProduct).equalTo('objectId', info.get('id')).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No master product found with Id: ${info.get('id')}`);
    } else {
      const object = new MasterProduct(results[0]);

      await object.updateInfo(info).saveObject();

      return object.getId();
    }
  };

  static delete = async (id) => {
    const results = await ParseWrapperService.createQuery(MasterProduct).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No master product found with Id: ${id}`);
    } else {
      await results[0].destroy();
    }
  };

  static search = async (criteria) => {
    const results = await MasterProductService.buildSearchQuery(criteria).find();

    return Immutable.fromJS(results).map(_ => new MasterProduct(_).getInfo());
  };

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = MasterProductService.buildSearchQuery(criteria).each(_ => event.raise(new MasterProduct(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria) => {
    const total = await MasterProductService.count(criteria);

    return total > 0;
  };

  static count = async criteria => MasterProductService.buildSearchQuery(criteria).count();

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(MasterProduct, criteria);

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

    if (conditions.has('imageUrl')) {
      const value = conditions.get('imageUrl');

      if (value) {
        query.equalTo('imageUrl', value);
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
