import Immutable from 'immutable';
import {
  ParseWrapperService,
} from 'micro-business-parse-server-common';
import {
  NewSearchResultReceivedEvent,
} from './new-search-result-received-event';
import {
  StapleTemplateShoppingList,
} from './schema';

class StapleTemplateShoppingListService {
  static create(info) {
    return new Promise((resolve, reject) => {
      StapleTemplateShoppingList.spawn(info)
        .save()
        .then(result => resolve(result.id))
        .catch(error => reject(error));
    });
  }

  static read(id) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(StapleTemplateShoppingList);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No staple template shopping list found with Id: ${id}`);
          } else {
            resolve(new StapleTemplateShoppingList(results[0])
              .getInfo());
          }
        })
        .catch(error => reject(error));
    });
  }

  static update(info) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(StapleTemplateShoppingList);

      query.equalTo('objectId', info.get('id'));
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No staple template shopping list found with Id: ${info.get('id')}`);
          } else {
            const object = new StapleTemplateShoppingList(results[0]);

            object.updateInfo(info)
              .saveObject()
              .then(() => resolve(object.getId()))
              .catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = ParseWrapperService.createQuery(StapleTemplateShoppingList);

      query.equalTo('objectId', id);
      query.limit(1);

      query.find()
        .then((results) => {
          if (results.length === 0) {
            reject(`No staple template shopping list found with Id: ${id}`);
          } else {
            results[0].destroy()
              .then(() => resolve())
              .catch(error => reject(error));
          }
        })
        .catch(error => reject(error));
    });
  }

  static search(criteria) {
    return new Promise((resolve, reject) => StapleTemplateShoppingListService.buildSearchQuery(criteria)
      .find()
      .then(results => resolve(Immutable.fromJS(results)
        .map(_ => new StapleTemplateShoppingList(_)
          .getInfo())))
      .catch(error => reject(error)));
  }

  static searchAll(criteria) {
    const event = new NewSearchResultReceivedEvent();
    const promise = StapleTemplateShoppingListService.buildSearchQuery(criteria)
      .each(_ => event.raise(new StapleTemplateShoppingList(_)
        .getInfo()));

    return {
      event,
      promise,
    };
  }

  static exists(criteria) {
    return new Promise((resolve, reject) => StapleTemplateShoppingListService.buildSearchQuery(criteria)
      .count()
      .then(total => resolve(total > 0))
      .catch(error => reject(error)));
  }

  static buildSearchQuery(criteria) {
    const query = ParseWrapperService.createQuery(StapleTemplateShoppingList);

    if (criteria.has('description') && criteria.get('description')) {
      query.equalTo('description', criteria.get('description'));
    }

    if (criteria.has('templateId') && criteria.get('templateId')) {
      query.equalTo('templates', criteria.get('templateId'));
    }

    return query;
  }
}

export {
  StapleTemplateShoppingListService,
};

export default StapleTemplateShoppingListService;
