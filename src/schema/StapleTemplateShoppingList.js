// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import StapleTemplate from './StapleTemplate';
import Tag from './Tag';

export default class StapleTemplateShoppingList extends BaseObject {
  static spawn = (info) => {
    const object = new StapleTemplateShoppingList();

    StapleTemplateShoppingList.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('name', info.get('name'));
    object.set('lowerCaseName', info.get('name').toLowerCase());

    if (info.has('stapleTemplateIds')) {
      const stapleTemplateIds = info.get('stapleTemplateIds');

      if (stapleTemplateIds.isEmpty()) {
        object.set('stapleTemplates', []);
      } else {
        object.set('stapleTemplates', stapleTemplateIds.map(stapleTemplateId => StapleTemplate.createWithoutData(stapleTemplateId)).toArray());
      }
    } else if (info.has('stapleTemplates')) {
      const stapleTemplates = info.get('stapleTemplates');

      if (stapleTemplates.isEmpty()) {
        object.set('stapleTemplates', []);
      } else {
        object.set('stapleTemplates', stapleTemplates.toArray());
      }
    }

    if (info.has('tagIds')) {
      const tagIds = info.get('tagIds');

      if (tagIds.isEmpty()) {
        object.set('tags', []);
      } else {
        object.set('tags', tagIds.map(tagId => Tag.createWithoutData(tagId)).toArray());
      }
    } else if (info.has('tags')) {
      const tags = info.get('tags');

      if (tags.isEmpty()) {
        object.set('tags', []);
      } else {
        object.set('tags', tags.toArray());
      }
    }
  };

  constructor(object) {
    super(object, 'StapleTemplateShoppingList');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    StapleTemplateShoppingList.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const stapleTemplateObjects = this.getObject().get('stapleTemplates');
    const stapleTemplates = stapleTemplateObjects
      ? Immutable.fromJS(stapleTemplateObjects).map(stapleTemplate => new StapleTemplate(stapleTemplate).getInfo())
      : undefined;
    const tagObjects = this.getObject().get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;

    return Map({
      id: this.getId(),
      name: this.getObject().get('name'),
      stapleTemplates,
      stapleTemplateIds: stapleTemplates ? stapleTemplates.map(stapleTemplate => stapleTemplate.get('id')) : List(),
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
    });
  };
}
