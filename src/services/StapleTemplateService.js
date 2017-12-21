// @flow

import { List } from 'immutable';
import { ParseWrapperService, ServiceBase } from '@microbusiness/parse-server-common';
import { StapleTemplate } from '../schema';

export default class StapleTemplateService extends ServiceBase {
  static fields = List.of('name', 'description', 'imageUrl');

  constructor() {
    super(StapleTemplate, StapleTemplateService.buildSearchQuery, StapleTemplateService.buildIncludeQuery, 'staple template');
  }

  static buildIncludeQuery = query => query;

  static buildSearchQuery = (criteria) => {
    const queryWithoutIncludes = ParseWrapperService.createQuery(StapleTemplate, criteria);
    const query = StapleTemplateService.buildIncludeQuery(queryWithoutIncludes, criteria);

    if (!criteria.has('conditions')) {
      return query;
    }

    const conditions = criteria.get('conditions');

    StapleTemplateService.fields.forEach((field) => {
      ServiceBase.addExistenceQuery(conditions, query, field);
    });
    ServiceBase.addStringQuery(conditions, query, 'name', 'nameLowerCase');
    ServiceBase.addStringQuery(conditions, query, 'description', 'descriptionLowerCase');
    ServiceBase.addEqualityQuery(conditions, query, 'imageUrl', 'imageUrl');

    return query;
  };
}
