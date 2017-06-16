// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { StapleTemplate, StapleTemplateShoppingList } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class StapleTemplateShoppingListService {
  static create = async (info) => {
    const result = await StapleTemplateShoppingList.spawn(info).save();

    return result.id;
  };

  static read = async (id) => {
    const results = await ParseWrapperService.createQuery(StapleTemplateShoppingList).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No staple template shopping list found with Id: ${id}`);
    }

    return new StapleTemplateShoppingList(results[0]).getInfo();
  };

  static update = async (info) => {
    const results = await ParseWrapperService.createQuery(StapleTemplateShoppingList).equalTo('objectId', info.get('id')).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No staple template shopping list found with Id: ${info.get('id')}`);
    } else {
      const object = new StapleTemplateShoppingList(results[0]);

      await object.updateInfo(info).saveObject();

      return object.getId();
    }
  };

  static delete = async (id) => {
    const results = await ParseWrapperService.createQuery(StapleTemplateShoppingList).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No staple template shopping list found with Id: ${id}`);
    } else {
      await results[0].destroy();
    }
  };

  static search = async (criteria) => {
    const results = await StapleTemplateShoppingListService.buildSearchQuery(criteria).find();

    return Immutable.fromJS(results).map(_ => new StapleTemplateShoppingList(_).getInfo());
  };

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = StapleTemplateShoppingListService.buildSearchQuery(criteria).each(_ => event.raise(new StapleTemplateShoppingList(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria) => {
    const total = await StapleTemplateShoppingListService.count(criteria);

    return total > 0;
  };

  static count = async criteria => StapleTemplateShoppingListService.buildSearchQuery(criteria).count();

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(StapleTemplateShoppingList, criteria);

    if (criteria.has('includeStapleTemplates')) {
      const value = criteria.get('includeStapleTemplates');

      if (value) {
        query.include('stapleTemplates');
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

    if (conditions.has('stapleTemplate')) {
      const value = conditions.get('stapleTemplate');

      if (value) {
        query.equalTo('stapleTemplates', value);
      }
    }

    if (conditions.has('stapleTemplates')) {
      const value = conditions.get('stapleTemplates');

      if (value) {
        query.containedIn('stapleTemplates', value.toArray());
      }
    }

    if (conditions.has('stapleTemplateId')) {
      const value = conditions.get('stapleTemplateId');

      if (value) {
        query.equalTo('stapleTemplates', StapleTemplate.createWithoutData(value));
      }
    }

    if (conditions.has('stapleTemplateIds')) {
      const value = conditions.get('stapleTemplateIds');

      if (value) {
        query.containedIn('stapleTemplates', value.map(stapleTemplateId => StapleTemplate.createWithoutData(stapleTemplateId)).toArray());
      }
    }

    return query;
  };
}
