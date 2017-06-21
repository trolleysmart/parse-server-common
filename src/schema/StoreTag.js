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

    const description = info.get('description');

    object.set('description', description);
    object.set('lowerCaseDescription', description ? description.toLowerCase() : undefined);

    object.set('weight', info.get('weight'));

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

      object.set('tag', Tag.createWithoutData(tagId));
    } else if (info.has('tag')) {
      const tag = info.get('tag');

      object.set('tag', tag);
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
    const storeObject = this.getObject().get('store');
    const store = storeObject ? new Store(storeObject).getInfo() : undefined;
    const tagObject = this.getObject().get('tag');
    const tag = tagObject ? new Tag(tagObject).getInfo() : undefined;

    return Map({
      id: this.getId(),
      key: this.getObject().get('key'),
      description: this.getObject().get('description'),
      weight: this.getObject().get('weight'),
      store,
      storeId: store ? store.get('id') : undefined,
      tag,
      tagId: tag ? tag.get('id') : undefined,
    });
  };
}
