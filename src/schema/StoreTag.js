// @flow

import { Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import Store from './Store';
import Tag from './Tag';

export default class StoreTag extends BaseObject {
  static spawn = (info) => {
    const object = new StoreTag();

    StoreTag.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    object.set('key', info.get('key'));
    BaseObject.createStringColumn(object, info, 'name');
    BaseObject.createStringColumn(object, info, 'description');
    object.set('imageUrl', info.get('imageUrl'));
    object.set('url', info.get('url'));
    object.set('level', info.get('level'));
    BaseObject.createPointer(object, info, 'parentStoreTag', StoreTag);
    BaseObject.createPointer(object, info, 'store', Store);
    BaseObject.createPointer(object, info, 'tag', Tag);
  };

  constructor(object) {
    super(object, 'StoreTag');
  }

  updateInfo = (info) => {
    StoreTag.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const parentStoreTagObject = object.get('parentStoreTag');
    const parentStoreTag = parentStoreTagObject ? new StoreTag(parentStoreTagObject) : undefined;
    const store = new Store(object.get('store'));
    const tag = new Tag(object.get('tag'));

    return Map({
      id: this.getId(),
      key: object.get('key'),
      name: object.get('name'),
      description: object.get('description'),
      imageUrl: object.get('imageUrl'),
      url: object.get('url'),
      level: object.get('level'),
      parentStoreTag: parentStoreTag ? parentStoreTag.getInfo() : undefined,
      parentStoreTagId: parentStoreTag ? parentStoreTag.getId() : undefined,
      store: store.getInfo(),
      storeId: store.getId(),
      tag: tag.getInfo(),
      tagId: tag.getId(),
    });
  };
}
