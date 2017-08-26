// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject, ParseWrapperService } from 'micro-business-parse-server-common';
import Tag from './Tag';

export default class ShoppingListItem extends BaseObject {
  static spawn = (info) => {
    const object = new ShoppingListItem();

    ShoppingListItem.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('name', info.get('name'));
    object.set('description', info.get('description'));
    object.set('imageUrl', info.get('imageUrl'));

    if (info.has('userId')) {
      const userId = info.get('userId');

      if (userId) {
        object.set('user', ParseWrapperService.createUserWithoutData(userId));
      }
    } else if (info.has('user')) {
      const user = info.get('user');

      if (user) {
        object.set('user', user);
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
    super(object, 'ShoppingListItem');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    ShoppingListItem.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const user = this.getObject().get('user');
    const tagObjects = this.getObject().get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;

    return Map({
      id: this.getId(),
      name: this.getObject().get('name'),
      description: this.getObject().get('description'),
      imageUrl: this.getObject().get('imageUrl'),
      user,
      userId: user ? user.id : undefined,
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
    });
  };
}