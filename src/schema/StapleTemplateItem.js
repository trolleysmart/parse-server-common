// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import StapleTemplate from './StapleTemplate';
import Tag from './Tag';

export default class StapleTemplateItem extends BaseObject {
  static spawn = (info) => {
    const object = new StapleTemplateItem();

    StapleTemplateItem.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    BaseObject.createStringColumn(object, info, 'name');
    BaseObject.createStringColumn(object, info, 'description');
    object.set('imageUrl', info.get('imageUrl'));
    object.set('popular', info.get('popular'));
    BaseObject.createArrayPointer(object, info, 'stapleTemplate', StapleTemplate);
    BaseObject.createArrayPointer(object, info, 'tag', Tag);
  };

  constructor(object) {
    super(object, 'StapleTemplateItem');
  }

  updateInfo = (info) => {
    StapleTemplateItem.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const stapleTemplateObjects = object.get('stapleTemplates');
    const stapleTemplates = stapleTemplateObjects
      ? Immutable.fromJS(stapleTemplateObjects).map(stapleTemplate => new StapleTemplate(stapleTemplate).getInfo())
      : undefined;
    const tagObjects = object.get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;

    return Map({
      id: this.getId(),
      name: object.get('name'),
      description: object.get('description'),
      imageUrl: object.get('imageUrl'),
      popular: object.get('popular'),
      stapleTemplates,
      stapleTemplateIds: stapleTemplates ? stapleTemplates.map(stapleTemplate => stapleTemplate.get('id')) : List(),
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
    });
  };
}
