// @flow

import BluebirdPromise from 'bluebird';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import { StapleShoppingList } from '../schema';
import ServiceBase from './ServiceBase';
import StapleTemplateShoppingListService from './StapleTemplateShoppingListService';

export default class StapleShoppingListService extends ServiceBase {
  static messagePrefix = 'No staple shopping list found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(StapleShoppingList, info, acl, sessionToken);

  static read = async (id, sessionToken) => ServiceBase.read(StapleShoppingList, id, sessionToken, StapleShoppingListService.messagePrefix);

  static update = async (info, sessionToken) => ServiceBase.update(StapleShoppingList, info, sessionToken, StapleShoppingListService.messagePrefix);

  static delete = async (id, sessionToken) => ServiceBase.delete(StapleShoppingList, id, sessionToken, StapleShoppingListService.messagePrefix);

  static search = async (criteria, sessionToken) =>
    ServiceBase.search(StapleShoppingList, StapleShoppingListService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) =>
    ServiceBase.searchAll(StapleShoppingList, StapleShoppingListService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(StapleShoppingListService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(StapleShoppingListService.buildSearchQuery, criteria, sessionToken);

  static cloneStapleShoppingList = async (userId, acl, sessionToken) => {
    const items = await StapleTemplateShoppingListService.loadAllStapleTemplateShoppingList(sessionToken);
    const splittedItems = ServiceBase.splitIntoChunks(items, 100);
    await BluebirdPromise.each(splittedItems.toArray(), chunck =>
      Promise.all(chunck.map(item => StapleShoppingListService.create(item.set('userId', userId), acl, sessionToken)).toArray()),
    );
  };

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

    ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');

    return query;
  };
}
