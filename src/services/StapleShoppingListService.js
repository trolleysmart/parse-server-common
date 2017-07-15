// @flow

import BluebirdPromise from 'bluebird';
import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { StapleShoppingList } from '../schema';
import ServiceBase from './ServiceBase';
import StapleTemplateShoppingListService from './StapleTemplateShoppingListService';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class StapleShoppingListService extends ServiceBase {
  static create = async (info, acl) => {
    const object = StapleShoppingList.spawn(info);

    ServiceBase.setACL(object, acl);

    const result = await object.save();

    return result.id;
  };

  static read = async (id, sessionToken) => {
    const result = await ParseWrapperService.createQuery(StapleShoppingList).equalTo('objectId', id).first({ sessionToken });

    if (!result) {
      throw new Exception(`No staple shopping list found with Id: ${id}`);
    }

    return new StapleShoppingList(result).getInfo();
  };

  static update = async (info, sessionToken) => {
    const result = await ParseWrapperService.createQuery(StapleShoppingList).equalTo('objectId', info.get('id')).first({ sessionToken });

    if (!result) {
      throw new Exception(`No staple shopping list found with Id: ${info.get('id')}`);
    } else {
      const object = new StapleShoppingList(result);

      await object.updateInfo(info).saveObject(sessionToken);

      return object.getId();
    }
  };

  static delete = async (id, sessionToken) => {
    const result = await ParseWrapperService.createQuery(StapleShoppingList).equalTo('objectId', id).first({ sessionToken });

    if (!result) {
      throw new Exception(`No staple shopping list found with Id: ${id}`);
    } else {
      await result.destroy({ sessionToken });
    }
  };

  static search = async (criteria, sessionToken) => {
    const results = await StapleShoppingListService.buildSearchQuery(criteria).find({ sessionToken });

    return Immutable.fromJS(results).map(_ => new StapleShoppingList(_).getInfo());
  };

  static searchAll = (criteria, sessionToken) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = StapleShoppingListService.buildSearchQuery(criteria).each(_ => event.raise(new StapleShoppingList(_).getInfo()), {
      sessionToken,
    });

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria, sessionToken) => (await StapleShoppingListService.count(criteria, sessionToken)) > 0;

  static count = async (criteria, sessionToken) => StapleShoppingListService.buildSearchQuery(criteria).count({ sessionToken });

  static cloneStapleShoppingList = async (userId, acl) => {
    const items = await StapleTemplateShoppingListService.loadAllStapleTemplateShoppingList();
    const splittedItems = ServiceBase.splitIntoChunks(items, 100);
    await BluebirdPromise.each(splittedItems.toArray(), chunck =>
      Promise.all(chunck.map(item => StapleShoppingListService.create(item.set('userId', userId), acl)).toArray()),
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
