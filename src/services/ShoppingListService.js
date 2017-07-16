// @flow

import { ParseWrapperService } from 'micro-business-parse-server-common';
import { MasterProductPrice, ShoppingList, StapleShoppingList } from '../schema';
import ServiceBase from './ServiceBase';

export default class ShoppingListService extends ServiceBase {
  static messagePrefix = 'No shopping list found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(ShoppingList, info, acl, sessionToken);

  static read = async (info, sessionToken) => ServiceBase.read(ShoppingList, info, sessionToken, ShoppingListService.messagePrefix);

  static update = async (info, sessionToken) => ServiceBase.update(ShoppingList, info, sessionToken, ShoppingListService.messagePrefix);

  static delete = async (info, sessionToken) => ServiceBase.delete(ShoppingList, info, sessionToken, ShoppingListService.messagePrefix);

  static search = async (criteria, sessionToken) => ServiceBase.search(ShoppingList, ShoppingListService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) => ServiceBase.searchAll(ShoppingList, ShoppingListService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(ShoppingListService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(ShoppingListService.buildSearchQuery, criteria, sessionToken);

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
