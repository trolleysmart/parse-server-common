// @flow

import { Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';

export default class Tag extends BaseObject {
  static spawn = (info) => {
    const object = new Tag();

    Tag.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('key', info.get('key'));
    object.set('name', info.get('name'));
    object.set('description', info.get('description'));
    object.set('imageUrl', info.get('imageUrl'));
    object.set('level', info.get('level'));
    object.set('forDisplay', info.get('forDisplay'));

    if (info.has('tagId')) {
      const tagId = info.get('tagId');

      if (tagId) {
        object.set('tag', Tag.createWithoutData(tagId));
      }
    } else if (info.has('tag')) {
      const tag = info.get('tag');

      if (tag) {
        object.set('tag', tag);
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
    const tagObject = this.getObject().get('tag');
    const tag = tagObject ? new Tag(tagObject) : undefined;

    return Map({
      id: this.getId(),
      key: this.getObject().get('key'),
      name: this.getObject().get('name'),
      description: this.getObject().get('description'),
      imageUrl: this.getObject().get('imageUrl'),
      level: this.getObject().get('level'),
      forDisplay: this.getObject().get('forDisplay'),
      tag: tag ? tag.getInfo() : undefined,
      tagId: tag ? tag.getId() : undefined,
    });
  };
}
