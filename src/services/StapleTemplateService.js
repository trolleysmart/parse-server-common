// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { StapleTemplate } from '../schema';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class StapleTemplateService {
  static create = async (info) => {
    const result = await StapleTemplate.spawn(info).save();

    return result.id;
  };

  static read = async (id) => {
    const results = await ParseWrapperService.createQuery(StapleTemplate).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No staple template found with Id: ${id}`);
    }

    return new StapleTemplate(results[0]).getInfo();
  };

  static update = async (info) => {
    const results = await ParseWrapperService.createQuery(StapleTemplate).equalTo('objectId', info.get('id')).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No staple template found with Id: ${info.get('id')}`);
    } else {
      const object = new StapleTemplate(results[0]);

      await object.updateInfo(info).saveObject();

      return object.getId();
    }
  };

  static delete = async (id) => {
    const results = await ParseWrapperService.createQuery(StapleTemplate).equalTo('objectId', id).limit(1).find();

    if (results.length === 0) {
      throw new Exception(`No staple template found with Id: ${id}`);
    } else {
      await results[0].destroy();
    }
  };

  static search = async (criteria) => {
    const results = await StapleTemplateService.buildSearchQuery(criteria).find();

    return Immutable.fromJS(results).map(_ => new StapleTemplate(_).getInfo());
  };

  static searchAll = (criteria) => {
    const event = new NewSearchResultReceivedEvent();
    const promise = StapleTemplateService.buildSearchQuery(criteria).each(_ => event.raise(new StapleTemplate(_).getInfo()));

    return {
      event,
      promise,
    };
  };

  static exists = async (criteria) => {
    const total = await StapleTemplateService.count(criteria);

    return total > 0;
  };

  static count = async criteria => StapleTemplateService.buildSearchQuery(criteria).count();

  static buildSearchQuery = (criteria) => {
    const query = ParseWrapperService.createQuery(StapleTemplate, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    if (conditions.has('name')) {
      const value = conditions.get('name');

      if (value) {
        query.equalTo('name', value.toLowerCase());
      }
    }

    if (conditions.has('startsWith_name')) {
      const value = conditions.get('startsWith_name');

      if (value) {
        query.startsWith('name', value.toLowerCase());
      }
    }

    if (conditions.has('contains_name')) {
      const value = conditions.get('contains_name');

      if (value) {
        query.contains('name', value.toLowerCase());
      }
    }

    if (conditions.has('contains_names')) {
      const values = conditions.get('contains_names');

      if (values && values.count() === 1) {
        query.contains('name', values.first().toLowerCase());
      } else if (values && values.count() > 1) {
        query.matches('name', values.map(value => `(?=.*${value.toLowerCase()})`).reduce((reduction, value) => reduction + value));
      }
    }

    return query;
  };
}
