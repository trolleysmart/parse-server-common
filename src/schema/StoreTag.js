// @flow

import Immutable, { List, Map } from 'immutable';
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

    const name = info.get('name');

    object.set('name', name);
    object.set('lowerCaseName', name ? name.toLowerCase() : undefined);
    object.set('url', info.get('url'));
    object.set('weight', info.get('weight'));

    if (info.has('storeTagIds')) {
      const storeTagIds = info.get('storeTagIds');

      if (storeTagIds.isEmpty()) {
        object.set('storeTags', []);
      } else {
        object.set('storeTags', storeTagIds.map(storeTagId => StoreTag.createWithoutData(storeTagId)).toArray());
      }
    } else if (info.has('storeTags')) {
      const storeTags = info.get('storeTags');

      if (storeTags.isEmpty()) {
        object.set('storeTags', []);
      } else {
        object.set('storeTags', storeTags.toArray());
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
    const storeTagObjects = this.getObject().get('storeTags');
    const storeTags = storeTagObjects ? Immutable.fromJS(storeTagObjects).map(storeTag => new StoreTag(storeTag).getInfo()) : undefined;
    const storeObject = this.getObject().get('store');
    const store = storeObject ? new Store(storeObject).getInfo() : undefined;
    const tagObject = this.getObject().get('tag');
    const tag = tagObject ? new Tag(tagObject).getInfo() : undefined;

    return Map({
      id: this.getId(),
      key: this.getObject().get('key'),
      name: this.getObject().get('name'),
      weight: this.getObject().get('weight'),
      url: this.getObject().get('url'),
      storeTags,
      storeTagIds: storeTags ? storeTags.map(storeTag => storeTag.get('id')) : List(),
      store,
      storeId: store ? store.get('id') : undefined,
      tag,
      tagId: tag ? tag.get('id') : undefined,
    });
  };
}
