// @flow

import { List, Map } from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import { StapleTemplate, StapleTemplateShoppingList, Tag } from '../schema';
import ServiceBase from './ServiceBase';

export default class StapleTemplateShoppingListService extends ServiceBase {
  static messagePrefix = 'No staple template shopping list found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(StapleTemplateShoppingList, info, acl, sessionToken);

  static read = async (info, sessionToken) =>
    ServiceBase.read(StapleTemplateShoppingList, info, sessionToken, StapleTemplateShoppingListService.messagePrefix);

  static update = async (info, sessionToken) =>
    ServiceBase.update(StapleTemplateShoppingList, info, sessionToken, StapleTemplateShoppingListService.messagePrefix);

  static delete = async (info, sessionToken) =>
    ServiceBase.delete(StapleTemplateShoppingList, info, sessionToken, StapleTemplateShoppingListService.messagePrefix);

  static search = async (criteria, sessionToken) =>
    ServiceBase.search(StapleTemplateShoppingList, StapleTemplateShoppingListService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) =>
    ServiceBase.searchAll(StapleTemplateShoppingList, StapleTemplateShoppingListService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(StapleTemplateShoppingListService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(StapleTemplateShoppingListService.buildSearchQuery, criteria, sessionToken);

  static loadAllStapleTemplateShoppingList = async (sessionToken) => {
    let stapleTemplateShoppingListItems = List();
    const result = await StapleTemplateShoppingListService.searchAll(Map({}), sessionToken);

    try {
      result.event.subscribe(info => (stapleTemplateShoppingListItems = stapleTemplateShoppingListItems.push(info)));

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    return stapleTemplateShoppingListItems;
  };

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

    ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');

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
