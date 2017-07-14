// @flow

import Immutable, { List, Map } from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { StapleTemplate, StapleTemplateShoppingList, Tag } from '../schema';
import ServiceBase from './ServiceBase';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class StapleTemplateShoppingListService extends ServiceBase {
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

  static loadAllStapleTemplateShoppingList = async () => {
    let stapleTemplateShoppingListItems = List();
    const result = await StapleTemplateShoppingListService.searchAll(Map({}));

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
