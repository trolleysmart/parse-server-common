// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import StapleTemplateItem from './StapleTemplateItem';
import Tag from './Tag';

export default class StapleItem extends BaseObject {
  static spawn = (info) => {
    const object = new StapleItem();

    StapleItem.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('name', info.get('name'));
    object.set('description', info.get('description'));
    object.set('imageUrl', info.get('imageUrl'));
    object.set('popular', info.get('popular'));
    BaseObject.createUserPointer(object, info, 'user');
    BaseObject.createPointer(object, info, 'stapleTemplateItem', StapleTemplateItem);
    BaseObject.createArrayPointer(object, info, 'tag', Tag);
  };

  constructor(object) {
    super(object, 'StapleItem');
  }

  updateInfo = (info) => {
    StapleItem.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const stapleTemplateItem = new StapleTemplateItem(object.get('stapleTemplateItem'));
    const user = object.get('user');
    const tagObjects = object.get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;

    return Map({
      id: this.getId(),
      name: object.get('name'),
      description: object.get('description'),
      imageUrl: object.get('imageUrl'),
      popular: object.get('popular'),
      user,
      userId: user ? user.id : undefined,
      stapleTemplateItem: stapleTemplateItem.getInfo(),
      stapleTemplateItemId: stapleTemplateItem.getId(),
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
    });
  };
}
