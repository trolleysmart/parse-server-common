// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { MasterProductPrice, ShoppingList, StapleShoppingList } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class ShoppingListService {
  static create = async (info) => {
    const result = await ShoppingList.spawn(info).save();

    return result.id;
  };

  static read = async (id) => {
    const results = await ParseWrapperService.createQuery(ShoppingList).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No shopping list found with Id: ${id}`);
    }

    return new ShoppingList(results[0]).getInfo();
  };

  static update = async (info) => {
    const results = await ParseWrapperService.createQuery(ShoppingList).equalTo('objectId', info.get('id')).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No shopping list found with Id: ${info.get('id')}`);
    } else {
      const object = new ShoppingList(results[0]);

      await object.updateInfo(info).saveObject();

      return object.getId();
    }
  };

  static delete = async (id) => {
    const results = await ParseWrapperService.createQuery(ShoppingList).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No shopping list found with Id: ${id}`);
    } else {
      await results[0].destroy();
    }
  };

  static search = async (criteria) => {
    const results = await ShoppingListService.buildSearchQuery(criteria).find();

    return Immutable.fromJS(results).map(_ => new ShoppingList(_).getInfo());
  };

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = ShoppingListService.buildSearchQuery(criteria).each(_ => event.raise(new ShoppingList(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria) => {
    const total = await ShoppingListService.buildSearchQuery(criteria).count();

    return total > 0;
  };

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(ShoppingList, criteria);

    if (criteria.has('includeStapleShoppingList')) {
      const value = criteria.get('includeStapleShoppingList');

      if (value) {
        query.include('stapleShoppingList');
      }
    }

    if (criteria.has('includeMasterProductPrice')) {
      const value = criteria.get('includeMasterProductPrice');

      if (value) {
        query.include('masterProductPrice');
      }
    }

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('includeItemsMarkedAsDone')) {
      const value = conditions.get('includeItemsMarkedAsDone');

      if (value) {
        query.exists('doneDate');
      }
    }

    if (conditions.has('excludeItemsMarkedAsDone')) {
      const value = conditions.get('excludeItemsMarkedAsDone');

      if (value) {
        query.doesNotExist('doneDate');
      }
    }

    if (conditions.has('includeStapleShoppingListOnly')) {
      const value = conditions.get('includeStapleShoppingListOnly');

      if (value) {
        query.exists('stapleShoppingList');
      }
    }

    if (conditions.has('includeMasterProductPriceOnly')) {
      const value = conditions.get('includeMasterProductPriceOnly');

      if (value) {
        query.exists('masterProductPrice');
      }
    }

    if (conditions.has('userId')) {
      const value = conditions.get('userId');

      if (value) {
        query.equalTo('user', ParseWrapperService.createUserWithoutData(value));
      }
    }

    if (conditions.has('stapleShoppingListId')) {
      const value = conditions.get('stapleShoppingListId');

      if (value) {
        query.equalTo('stapleShoppingList', StapleShoppingList.createWithoutData(value));
      }
    }

    if (conditions.has('masterProductPriceId')) {
      const value = conditions.get('masterProductPriceId');

      if (value) {
        query.equalTo('masterProductPrice', MasterProductPrice.createWithoutData(value));
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

    return query;
  };
}
