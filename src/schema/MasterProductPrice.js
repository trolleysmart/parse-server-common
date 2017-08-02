// @flow

import Immutable, { List, Map } from 'immutable';
import { BaseObject } from 'micro-business-parse-server-common';
import MasterProduct from './MasterProduct';
import Store from './Store';
import Tag from './Tag';

export default class MasterProductPrice extends BaseObject {
  static spawn = (info) => {
    const object = new MasterProductPrice();

    MasterProductPrice.updateInfoInternal(object, info);

    return object;
  };

  static updateInfoInternal = (object, info) => {
    const name = info.get('name');

    object.set('name', name ? name.toLowerCase() : undefined);

    const description = info.get('description');

    object.set('description', description ? description.toLowerCase() : undefined);

    const storeName = info.get('storeName');

    object.set('storeName', storeName ? storeName.toLowerCase() : undefined);

    object.set('priceDetails', info.get('priceDetails').toJS());
    object.set('priceToDisplay', info.get('priceToDisplay'));
    object.set('saving', info.get('saving'));
    object.set('savingPercentage', info.get('savingPercentage'));
    object.set('offerEndDate', info.get('offerEndDate'));
    object.set('firstCrawledDate', info.get('firstCrawledDate'));
    object.set('status', info.get('status'));

    if (info.has('masterProductId')) {
      const masterProductId = info.get('masterProductId');

      if (masterProductId) {
        object.set('masterProduct', MasterProduct.createWithoutData(masterProductId));
      }
    } else if (info.has('masterProduct')) {
      const masterProduct = info.get('masterProduct');

      if (masterProduct) {
        object.set('masterProduct', masterProduct);
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
    super(object, 'MasterProductPrice');
  }

  updateInfo = (info) => {
    const object = this.getObject();

    MasterProductPrice.updateInfoInternal(object, info);

    return this;
  };

  getInfo = () => {
    const masterProduct = new MasterProduct(this.getObject().get('masterProduct'));
    const store = new Store(this.getObject().get('store'));
    const tagObjects = this.getObject().get('tags');
    const tags = tagObjects ? Immutable.fromJS(tagObjects).map(tag => new Tag(tag).getInfo()) : undefined;

    return Map({
      id: this.getId(),
      name: this.getObject().get('name'),
      description: this.getObject().get('description'),
      storeName: this.getObject().get('storeName'),
      priceDetails: Immutable.fromJS(this.getObject().get('priceDetails')),
      priceToDisplay: this.getObject().get('priceToDisplay'),
      saving: this.getObject().get('saving'),
      savingPercentage: this.getObject().get('savingPercentage'),
      offerEndDate: this.getObject().get('offerEndDate'),
      firstCrawledDate: this.getObject().get('firstCrawledDate'),
      status: this.getObject().get('status'),
      masterProduct: masterProduct.getInfo(),
      masterProductId: masterProduct.getId(),
      store: store.getInfo(),
      storeId: store.getId(),
      tags,
      tagIds: tags ? tags.map(tag => tag.get('id')) : List(),
    });
  };
}
