// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import StapleShoppingListTemplate from './StapleShoppingListTemplate';
import Tag from './Tag';

export default class StapleShoppingListDetailsTemplate extends BaseObject {
  static spawn = (info) => {
    const object = new StapleShoppingListDetailsTemplate();

    StapleShoppingListDetailsTemplate.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('name', info.get('name'));
    object.set('description', info.get('description'));
    object.set('imageUrl', info.get('imageUrl'));

    if (info.has('stapleShoppingListTemplateIds')) {
      const stapleShoppingListTemplateIds = info.get('stapleShoppingListTemplateIds');

      if (stapleShoppingListTemplateIds.isEmpty()) {
        object.set('stapleShoppingListTemplates', []);
      } else {
        object.set(
          'stapleShoppingListTemplates',
          stapleShoppingListTemplateIds
            .map(stapleShoppingListTemplateId => StapleShoppingListTemplate.createWithoutData(stapleShoppingListTemplateId))
            .toArray(),
        );
      }
    } else if (info.has('stapleShoppingListTemplates')) {
      const stapleShoppingListTemplates = info.get('stapleShoppingListTemplates');

      if (stapleShoppingListTemplates.isEmpty()) {
        object.set('stapleShoppingListTemplates', []);
      } else {
        object.set('stapleShoppingListTemplates', stapleShoppingListTemplates.toArray());
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
    super(object, 'StapleShoppingListDetailsTemplate');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    StapleShoppingListDetailsTemplate.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const stapleShoppingListTemplateObjects = this.getObject().get('stapleShoppingListTemplates');
    const stapleShoppingListTemplates = stapleShoppingListTemplateObjects
      ? Immutable.fromJS(stapleShoppingListTemplateObjects).map(stapleShoppingListTemplate =>
        new StapleShoppingListTemplate(stapleShoppingListTemplate).getInfo(),
      )
      : undefined;
    const tagObjects = this.getObject().get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;

    return Map({
      id: this.getId(),
      name: this.getObject().get('name'),
      description: this.getObject().get('description'),
      imageUrl: this.getObject().get('imageUrl'),
      stapleShoppingListTemplates,
      stapleShoppingListTemplateIds: stapleShoppingListTemplates
        ? stapleShoppingListTemplates.map(stapleShoppingListTemplate => stapleShoppingListTemplate.get('id'))
        : List(),
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
    });
  };
}
