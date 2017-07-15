// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { MasterProductPrice, ShoppingList, StapleShoppingList } from '../schema';
import ServiceBase from './ServiceBase';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class ShoppingListService extends ServiceBase {
  static create = async (info, acl) => {
    const object = ShoppingList.spawn(info);

    ServiceBase.setACL(object, acl);

    const result = await object.save();

    return result.id;
  };

  static read = async (id, sessionToken) => {
    const result = await ParseWrapperService.createQuery(ShoppingList).equalTo('objectId', id).first({ sessionToken });

    if (!result) {
      throw new Exception(`No shopping list found with Id: ${id}`);
    }

    return new ShoppingList(result).getInfo();
  };

  static update = async (info, sessionToken) => {
    const result = await ParseWrapperService.createQuery(ShoppingList).equalTo('objectId', info.get('id')).first({ sessionToken });

    if (!result) {
      throw new Exception(`No shopping list found with Id: ${info.get('id')}`);
    } else {
      const object = new ShoppingList(result);

      await object.updateInfo(info).saveObject(sessionToken);

      return object.getId();
    }
  };

  static delete = async (id, sessionToken) => {
    const result = await ParseWrapperService.createQuery(ShoppingList).equalTo('objectId', id).first({ sessionToken });

    if (!result) {
      throw new Exception(`No shopping list found with Id: ${id}`);
    } else {
      await result.destroy({ sessionToken });
    }
  };

  static search = async (criteria, sessionToken) => {
    const results = await ShoppingListService.buildSearchQuery(criteria).find({ sessionToken });

    return Immutable.fromJS(results).map(_ => new ShoppingList(_).getInfo());
  };

  static searchAll = (criteria, sessionToken) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = ShoppingListService.buildSearchQuery(criteria).each(_ => event.raise(new ShoppingList(_).getInfo()), { sessionToken });

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria, sessionToken) => (await ShoppingListService.count(criteria, sessionToken)) > 0;

  static count = async (criteria, sessionToken) => ShoppingListService.buildSearchQuery(criteria).count({ sessionToken });

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

    ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'name');

    return query;
  };
}
