// @flow

import { ParseWrapperService } from 'micro-business-parse-server-common';
import { StapleTemplate } from '../schema';
import ServiceBase from './ServiceBase';

export default class StapleTemplateService extends ServiceBase {
  static messagePrefix = 'No staple template found with Id: ';

  static create = async (info, acl, sessionToken) => ServiceBase.create(StapleTemplate, info, acl, sessionToken);

  static read = async (info, sessionToken) => ServiceBase.read(StapleTemplate, info, sessionToken, StapleTemplateService.messagePrefix);

  static update = async (info, sessionToken) => ServiceBase.update(StapleTemplate, info, sessionToken, StapleTemplateService.messagePrefix);

  static delete = async (info, sessionToken) => ServiceBase.delete(StapleTemplate, info, sessionToken, StapleTemplateService.messagePrefix);

  static search = async (criteria, sessionToken) =>
    ServiceBase.search(StapleTemplate, StapleTemplateService.buildSearchQuery, criteria, sessionToken);

  static searchAll = (criteria, sessionToken) =>
    ServiceBase.searchAll(StapleTemplate, StapleTemplateService.buildSearchQuery, criteria, sessionToken);

  static count = async (criteria, sessionToken) => ServiceBase.count(StapleTemplateService.buildSearchQuery, criteria, sessionToken);

  static exists = async (criteria, sessionToken) => ServiceBase.exists(StapleTemplateService.buildSearchQuery, criteria, sessionToken);

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
