// @flow

import Immutable from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import { StapleTemplate, StapleTemplateShoppingList } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class StapleTemplateShoppingListService {
  static create = info =>
    new Promise((resolve, reject) => {
      StapleTemplateShoppingList.spawn(info).save().then(result => resolve(result.id)).catch(error => reject(error));
    });

  static read = id =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(StapleTemplateShoppingList)
        .equalTo('objectId', id)
        .limit(1)
        .find()
        .then(results => {
          if (results.length === 0) {
            reject(`No staple template shopping list found with Id: ${id}`);
          } else {
            resolve(new StapleTemplateShoppingList(results[0]).getInfo());
          }
        })
        .catch(error => reject(error));
    });

  static update = info =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(StapleTemplateShoppingList)
        .equalTo('objectId', info.get('id'))
        .limit(1)
        .find()
        .then(results => {
          if (results.length === 0) {
            reject(`No staple template shopping list found with Id: ${info.get('id')}`);
          } else {
            const object = new StapleTemplateShoppingList(results[0]);

            object.updateInfo(info).saveObject().then(() => resolve(object.getId())).catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });

  static delete = id =>
    new Promise((resolve, reject) => {
      ParseWrapperService.createQuery(StapleTemplateShoppingList)
        .equalTo('objectId', id)
        .limit(1)
        .find()
        .then(results => {
          if (results.length === 0) {
            reject(`No staple template shopping list found with Id: ${id}`);
          } else {
            results[0].destroy().then(() => resolve()).catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });

  static search = criteria =>
    new Promise((resolve, reject) =>
      StapleTemplateShoppingListService.buildSearchQuery(criteria)
        .find()
        .then(results => resolve(Immutable.fromJS(results).map(_ => new StapleTemplateShoppingList(_).getInfo())))
        .catch(error => reject(error)),
    );

  static searchAll = criteria => {
    const event = new NewSearchResultReceivedEvent();
    const promise = StapleTemplateShoppingListService.buildSearchQuery(criteria).each(_ => event.raise(new StapleTemplateShoppingList(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = criteria =>
    new Promise((resolve, reject) =>
      StapleTemplateShoppingListService.buildSearchQuery(criteria).count().then(total => resolve(total > 0)).catch(error => reject(error)),
    );

  static buildSearchQuery = criteria => {
    const query = ParseWrapperService.createQuery(StapleTemplateShoppingList, criteria);

    if (criteria.has('includeStapleTemplates')) {
      const value = criteria.get('includeStapleTemplates');

      if (value) {
        query.include('stapleTemplates');
      }
    }

    if (!criteria.has('conditions')) {
      return ParseWrapperService.createQueryIncludingObjectIds(StapleTemplateShoppingList, query, criteria);
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('description')) {
      const value = conditions.get('description');

      if (value) {
        query.equalTo('description', value);
      }
    }

    if (conditions.has('startsWith_description')) {
      const value = conditions.get('startsWith_description');

      if (value) {
        query.startsWith('description', value);
      }
    }

    if (conditions.has('contains_description')) {
      const value = conditions.get('contains_description');

      if (value) {
        query.contains('description', value);
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

    return ParseWrapperService.createQueryIncludingObjectIds(StapleTemplateShoppingList, query, criteria);
  };
}
