// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { StoreProduct } from '../';
import createStores from '../../services/__tests__/StoreService.test';
import createStoreTags from '../../services/__tests__/StoreTagService.test';
import createTags from '../../services/__tests__/TagService.test';

const chance = new Chance();

export const createStoreProductInfo = async () => {
  const store = (await createStores(1)).first();
  const storeTags = await createStoreTags(chance.integer({ min: 1, max: 1 }));
  const tags = await createTags(chance.integer({ min: 1, max: 1 }));
  const storeProduct = Map({
    name: uuid(),
    description: uuid(),
    barcode: uuid(),
    productPageUrl: uuid(),
    imageUrl: uuid(),
    size: uuid(),
    lastCrawlDateTime: new Date(),
    storeId: store.get('id'),
    storeTagIds: storeTags.map(storeTag => storeTag.get('id')),
    tagIds: tags.map(tag => tag.get('id')),
    createdByCrawler: chance.integer({ min: 1, max: 1000 }) % 2 === 0,
    authorizedToDisplay: chance.integer({ min: 1, max: 1000 }) % 2 === 0,
  });

  return {
    storeProduct,
    store,
    storeTags,
    tags,
  };
};

export const createStoreProduct = async object => StoreProduct.spawn(object || (await createStoreProductInfo()).storeProduct);

export const expectStoreProduct = (object, expectedObject, {
  storeProductId, expectedStore, expectedStoreTags, expectedTags,
} = {}) => {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('barcode')).toBe(expectedObject.get('barcode'));
  expect(object.get('productPageUrl')).toBe(expectedObject.get('productPageUrl'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('size')).toBe(expectedObject.get('size'));
  expect(object.get('lastCrawlDateTime')).toEqual(expectedObject.get('lastCrawlDateTime'));
  expect(object.get('storeId')).toBe(expectedObject.get('storeId'));
  expect(object.get('storeTagIds')).toEqual(expectedObject.get('storeTagIds'));
  expect(object.get('tagIds')).toEqual(expectedObject.get('tagIds'));
  expect(object.get('createdByCrawler')).toBe(expectedObject.get('createdByCrawler'));
  expect(object.get('authorizedToDisplay')).toBe(expectedObject.get('authorizedToDisplay'));

  if (storeProductId) {
    expect(object.get('id')).toBe(storeProductId);
  }

  if (expectedStore) {
    expect(object.get('store')).toEqual(expectedStore);
  }

  if (expectedStoreTags) {
    expect(object.get('storeTagIds')).toEqual(expectedStoreTags.map(_ => _.get('id')));
  }

  if (expectedTags) {
    expect(object.get('tagIds')).toEqual(expectedTags.map(_ => _.get('id')));
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createStoreProduct()).className).toBe('StoreProduct');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { storeProduct } = await createStoreProductInfo();
    const object = await createStoreProduct(storeProduct);
    const info = object.getInfo();

    expectStoreProduct(info, storeProduct);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createStoreProduct();

    expect(new StoreProduct(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createStoreProduct();

    expect(new StoreProduct(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createStoreProduct();
    const { storeProduct: updatedStoreProduct } = await createStoreProductInfo();

    object.updateInfo(updatedStoreProduct);

    const info = object.getInfo();

    expectStoreProduct(info, updatedStoreProduct);
  });

  test('getInfo should return provided info', async () => {
    const { storeProduct } = await createStoreProductInfo();
    const object = await createStoreProduct(storeProduct);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStoreProduct(info, storeProduct);
  });
});
