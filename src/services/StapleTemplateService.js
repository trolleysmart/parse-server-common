// @flow

import Immutable from 'immutable';
import { ParseWrapperService, Exception } from 'micro-business-parse-server-common';
import { StapleTemplate } from '../schema';
import ServiceBase from './ServiceBase';
import NewSearchResultReceivedEvent from './NewSearchResultReceivedEvent';

export default class StapleTemplateService extends ServiceBase {
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

    ServiceBase.addStringSearchToQuery(conditions, query, 'name', 'lowerCaseName');

    return query;
  };
}
