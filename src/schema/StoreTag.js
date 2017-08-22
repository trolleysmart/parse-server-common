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
    object.set('name', info.get('name'));
    object.set('description', info.get('description'));
    object.set('imageUrl', info.get('imageUrl'));
    object.set('url', info.get('url'));
    object.set('level', info.get('level'));

    if (info.has('parentStoreTagId')) {
      const parentStoreTagId = info.get('parentStoreTagId');

      if (parentStoreTagId) {
        object.set('parentStoreTag', StoreTag.createWithoutData(parentStoreTagId));
      }
    } else if (info.has('parentStoreTag')) {
      const parentStoreTag = info.get('parentStoreTag');

      if (parentStoreTag) {
        object.set('parentStoreTag', parentStoreTag);
      }
    }

    if (info.has('storeId')) {
      const storeId = info.get('storeId');

      if (storeId) {
        object.set('store', Store.createWithoutData(storeId));
      }
    } else if (info.has('store')) {
      const store = info.get('store');

      if (store) {
        object.set('store', store);
      }
    }

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
    super(object, 'StoreTag');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    StoreTag.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const parentStoreTagObject = this.getObject().get('parentStoreTag');
    const parentStoreTag = parentStoreTagObject ? new StoreTag(parentStoreTagObject) : undefined;
    const store = new Store(this.getObject().get('store'));
    const tag = new Tag(this.getObject().get('tag'));

    return Map({
      id: this.getId(),
      key: this.getObject().get('key'),
      name: this.getObject().get('name'),
      description: this.getObject().get('description'),
      imageUrl: this.getObject().get('imageUrl'),
      url: this.getObject().get('url'),
      level: this.getObject().get('level'),
      parentStoreTag: parentStoreTag ? parentStoreTag.getInfo() : undefined,
      parentStoreTagId: parentStoreTag ? parentStoreTag.getId() : undefined,
      store: store.getInfo(),
      storeId: store.getId(),
      tag: tag.getInfo(),
      tagId: tag.getId(),
    });
  };
}
