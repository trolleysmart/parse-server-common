// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import Tag from './Tag';

export default class MasterProduct extends BaseObject {
  static spawn = info => {
    const object = new MasterProduct();

    MasterProduct.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    BaseObject.createStringColumn(object, info, 'name');
    BaseObject.createStringColumn(object, info, 'description');
    object.set('barcode', info.get('barcode'));
    object.set('imageUrl', info.get('imageUrl'));
    object.set('size', info.get('size'));
    BaseObject.createArrayPointer(object, info, 'tag', Tag);
  };

  constructor(object) {
    super(object, 'MasterProduct');
  }

  updateInfo = info => {
    MasterProduct.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const tagObjects = object.get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;

    return Map({
      id: this.getId(),
      name: object.get('name'),
      description: object.get('description'),
      barcode: object.get('barcode'),
      imageUrl: object.get('imageUrl'),
      size: object.get('size'),
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
    });
  };
}
