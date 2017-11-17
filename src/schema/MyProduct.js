// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import Tag from './Tag';

export default class MyProduct extends BaseObject {
  static spawn = (info) => {
    const object = new MyProduct();

    MyProduct.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    BaseObject.createStringColumn(object, info, 'name');
    BaseObject.createStringColumn(object, info, 'description');
    object.set('barcode', info.get('barcode'));
    object.set('productPageUrl', info.get('productPageUrl'));
    object.set('imageUrl', info.get('imageUrl'));
    object.set('size', info.get('size'));
    BaseObject.createArrayPointer(object, info, 'tag', Tag);
    BaseObject.createUserPointer(object, info, 'ownedByUser');
  };

  constructor(object) {
    super(object, 'MyProduct');
  }

  updateInfo = (info) => {
    MyProduct.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const tagObjects = object.get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;
    const ownedByUser = object.get('ownedByUser');

    return Map({
      id: this.getId(),
      name: object.get('name'),
      description: object.get('description'),
      barcode: object.get('barcode'),
      productPageUrl: object.get('productPageUrl'),
      imageUrl: object.get('imageUrl'),
      size: object.get('size'),
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
      ownedByUser,
      ownedByUserId: ownedByUser ? ownedByUser.id : undefined,
    });
  };
}
