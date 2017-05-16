// @flow

import Immutable from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import { StapleShoppingList } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class StapleShoppingListService {
  static create = info =>
    new Promise((resolve, reject) => {
      StapleShoppingList.spawn(info).save().then(result => resolve(result.id)).catch(error => reject(error));
    });

  static read = id =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(StapleShoppingList)
        .equalTo('objectId', id)
        .limit(1)
        .find()
        .then(results => {
          if (results.length === 0) {
            reject(`No staple shopping list found with Id: ${id}`);
          } else {
            resolve(new StapleShoppingList(results[0]).getInfo());
          }
        })
        .catch(error => reject(error));
    });

  static update = info =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(StapleShoppingList)
        .equalTo('objectId', info.get('id'))
        .limit(1)
        .find()
        .then(results => {
          if (results.length === 0) {
            reject(`No staple shopping list found with Id: ${info.get('id')}`);
          } else {
            const object = new StapleShoppingList(results[0]);

            object.updateInfo(info).saveObject().then(() => resolve(object.getId())).catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });

  static delete = id =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(StapleShoppingList)
        .equalTo('objectId', id)
        .limit(1)
        .find()
        .then(results => {
          if (results.length === 0) {
            reject(`No staple shopping list found with Id: ${id}`);
          } else {
            results[0].destroy().then(() => resolve()).catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });

  static search = criteria =>
    new Promise((resolve, reject) =>
      StapleShoppingListService.buildSearchQuery(criteria)
        .find()
        .then(results => resolve(Immutable.fromJS(results).map(_ => new StapleShoppingList(_).getInfo())))
        .catch(error => reject(error)),
    );

  static searchAll = criteria => {
    const event = new NewSearchResultReceivedEvent();
    const promise = StapleShoppingListService.buildSearchQuery(criteria).each(_ => event.raise(new StapleShoppingList(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = criteria =>
    new Promise((resolve, reject) =>
      StapleShoppingListService.buildSearchQuery(criteria).count().then(total => resolve(total > 0)).catch(error => reject(error)),
    );

  static buildSearchQuery = criteria => {
    const query = ParseWrapperService.createQuery(StapleShoppingList, criteria);

    if (!criteria.has('conditions')) {
      return ParseWrapperService.createQueryIncludingObjectIds(StapleShoppingList, query, criteria);
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('userId')) {
      const value = conditions.get('userId');

      if (value) {
        query.equalTo('user', ParseWrapperService.createUserWithoutData(value));
      }
    }

    return ParseWrapperService.createQueryIncludingObjectIds(StapleShoppingList, query, criteria);
  };
}
