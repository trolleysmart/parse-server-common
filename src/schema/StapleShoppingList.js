// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject, ParseWrapperService } from 'micro-business-parse-server-common';
import Tag from './Tag';

export default class StapleShoppingList extends BaseObject {
  static spawn = (info) => {
    const object = new StapleShoppingList();

    StapleShoppingList.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('user', ParseWrapperService.createUserWithoutData(info.get('userId')));
    object.set('name', info.get('name'));
    object.set('lowerCaseName', info.get('name').toLowerCase());
    object.set('addedByUser', info.has('addedByUser') ? info.get('addedByUser') : false);

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
    super(object, 'StapleShoppingList');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    StapleShoppingList.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const user = this.getObject().get('user');
    const tagObjects = this.getObject().get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;

    return Map({
      id: this.getId(),
      userId: user ? user.id : undefined,
      name: this.getObject().get('name'),
      addedByUser: this.getObject().get('addedByUser'),
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
    });
  };
}
