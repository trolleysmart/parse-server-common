// @flow

import { Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import Tag from './Tag';

export default class TagMapping extends BaseObject {
  static spawn = (info) => {
    const object = new TagMapping();

    TagMapping.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('key', info.get('key'));

    const description = info.get('description');

    object.set('description', description);
    object.set('lowerCaseDescription', description ? description.toLowerCase() : undefined);

    object.set('weight', info.get('weight'));

    if (info.has('tagId')) {
      const tagId = info.get('tagId');

      object.set('tag', Tag.createWithoutData(tagId));
    } else if (info.has('tag')) {
      const tag = info.get('tag');

      object.set('tag', tag);
    }
  };

  constructor(object) {
    super(object, 'TagMapping');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    TagMapping.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const tagObject = this.getObject().get('tag');
    const tag = tagObject ? new Tag(tagObject).getInfo() : undefined;

    return Map({
      id: this.getId(),
      key: this.getObject().get('key'),
      description: this.getObject().get('description'),
      weight: this.getObject().get('weight'),
      tag,
      tagId: tag ? tag.get('id') : undefined,
    });
  };
}
