// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import Tag from './Tag';

export default class MasterProduct extends BaseObject {
  static spawn = (info) => {
    const object = new MasterProduct();

    MasterProduct.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    const name = info.get('name');

    object.set('name', name);
    object.set('lowerCaseName', name ? name.toLowerCase() : undefined);

    const description = info.get('description');

    object.set('description', description);
    object.set('lowerCaseDescription', description ? description.toLowerCase() : undefined);

    object.set('barcode', info.get('barcode'));
    object.set('imageUrl', info.get('imageUrl'));

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
    super(object, 'MasterProduct');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    MasterProduct.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const tagObjects = this.getObject().get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;

    return Map({
      id: this.getId(),
      name: this.getObject().get('name'),
      description: this.getObject().get('description'),
      barcode: this.getObject().get('barcode'),
      imageUrl: this.getObject().get('imageUrl'),
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
    });
  };
}
