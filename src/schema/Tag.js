// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';

export default class Tag extends BaseObject {
  static spawn = (info) => {
    const object = new Tag();

    Tag.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('key', info.get('key'));

    const name = info.get('name');

    object.set('name', name);
    object.set('lowerCaseName', name ? name.toLowerCase() : undefined);
    object.set('weight', info.get('weight'));

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
    super(object, 'Tag');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    Tag.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const tagObjects = this.getObject().get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;

    return Map({
      id: this.getId(),
      key: this.getObject().get('key'),
      name: this.getObject().get('name'),
      weight: this.getObject().get('weight'),
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
    });
  };
}
