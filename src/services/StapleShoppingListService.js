// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { StapleShoppingList } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class StapleShoppingListService {
  static create = async (info) => {
    const result = await StapleShoppingList.spawn(info).save();

    return result.id;
  };

  static read = async (id) => {
    const results = await ParseWrapperService.createQuery(StapleShoppingList).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No staple shopping list found with Id: ${id}`);
    }

    return new StapleShoppingList(results[0]).getInfo();
  };

  static update = async (info) => {
    const results = await ParseWrapperService.createQuery(StapleShoppingList).equalTo('objectId', info.get('id')).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No staple shopping list found with Id: ${info.get('id')}`);
    } else {
      const object = new StapleShoppingList(results[0]);

      await object.updateInfo(info).saveObject();

      return object.getId();
    }
  };

  static delete = async (id) => {
    const results = await ParseWrapperService.createQuery(StapleShoppingList).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No staple shopping list found with Id: ${id}`);
    } else {
      await results[0].destroy();
    }
  };

  static search = async (criteria) => {
    const results = await StapleShoppingListService.buildSearchQuery(criteria).find();

    return Immutable.fromJS(results).map(_ => new StapleShoppingList(_).getInfo());
  };

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = StapleShoppingListService.buildSearchQuery(criteria).each(_ => event.raise(new StapleShoppingList(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria) => {
    const total = await StapleShoppingListService.count(criteria);

    return total > 0;
  };

  static count = async criteria => StapleShoppingListService.buildSearchQuery(criteria).count();

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(StapleShoppingList, criteria);

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

    if (conditions.has('userId')) {
      const value = conditions.get('userId');

      if (value) {
        query.equalTo('user', ParseWrapperService.createUserWithoutData(value));
      }
    }

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

    return query;
  };
}
