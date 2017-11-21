// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import Store from './Store';
import StoreTag from './StoreTag';
import Tag from './Tag';

export default class StoreProduct extends BaseObject {
  static spawn = (info) => {
    const object = new StoreProduct();

    StoreProduct.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    BaseObject.createStringColumn(object, info, 'name');
    BaseObject.createStringColumn(object, info, 'description');
    object.set('barcode', info.get('barcode'));
    object.set('productPageUrl', info.get('productPageUrl'));
    object.set('imageUrl', info.get('imageUrl'));
    object.set('size', info.get('size'));
    object.set('lastCrawlDateTime', info.get('lastCrawlDateTime'));
    BaseObject.createArrayPointer(object, info, 'storeTag', StoreTag);
    BaseObject.createArrayPointer(object, info, 'tag', Tag);
    BaseObject.createPointer(object, info, 'store', Store);
    object.set('createdByCrawler', info.get('createdByCrawler'));
    object.set('authorizedToDisplay', info.get('authorizedToDisplay'));
  };

  constructor(object) {
    super(object, 'StoreProduct');
  }

  updateInfo = (info) => {
    StoreProduct.updateInfoInternal(this.getObject(), info);

    return this;
  };

  getInfo = () => {
    const object = this.getObject();
    const store = new Store(object.get('store'));
    const storeTagObjects = object.get('storeTags');
    const storeTags = storeTagObjects ? Immutable.fromJS(storeTagObjects).map(storeTag => new StoreTag(storeTag).getInfo()) : undefined;
    const tagObjects = object.get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;

    return Map({
      id: this.getId(),
      name: object.get('name'),
      description: object.get('description'),
      barcode: object.get('barcode'),
      productPageUrl: object.get('productPageUrl'),
      imageUrl: object.get('imageUrl'),
      size: object.get('size'),
      lastCrawlDateTime: object.get('lastCrawlDateTime'),
      store: store.getInfo(),
      storeId: store.getId(),
      storeTags,
      storeTagIds: storeTags ? storeTags.map(storeTag => storeTag.get('id')) : List(),
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
      createdByCrawler: object.get('createdByCrawler'),
      authorizedToDisplay: object.get('authorizedToDisplay'),
    });
  };
}
