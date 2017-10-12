// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { CrawledStoreProduct } from '../';
import createStores from '../../services/__tests__/StoreService.test';
import createStoreTags from '../../services/__tests__/StoreTagService.test';

const chance = new Chance();

export const createCrawledStoreProductInfo = async () => {
  const store = (await createStores(1)).first();
  const storeTags = await createStoreTags(chance.integer({ min: 1, max: 1 }));
  const crawledStoreProduct = Map({
    name: uuid(),
    description: uuid(),
    barcode: uuid(),
    productPageUrl: uuid(),
    imageUrl: uuid(),
    size: uuid(),
    lastCrawlDateTime: new Date(),
    special: chance.integer({ min: 0, max: 1000 }) % 2 === 0,
    storeId: store.get('id'),
    storeTagIds: storeTags.map(storeTag => storeTag.get('id')),
  });

  return { crawledStoreProduct, store, storeTags };
};

export const createCrawledStoreProduct = async object =>
  CrawledStoreProduct.spawn(object || (await createCrawledStoreProductInfo()).crawledStoreProduct);

export const expectCrawledStoreProduct = (object, expectedObject, { crawledStoreProductId, expectedStore, expectedStoreTags } = {}) => {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('barcode')).toBe(expectedObject.get('barcode'));
  expect(object.get('productPageUrl')).toBe(expectedObject.get('productPageUrl'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('size')).toBe(expectedObject.get('size'));
  expect(object.get('lastCrawlDateTime')).toEqual(expectedObject.get('lastCrawlDateTime'));
  expect(object.get('storeId')).toBe(expectedObject.get('storeId'));
  expect(object.get('storeTagIds')).toEqual(expectedObject.get('storeTagIds'));

  if (crawledStoreProductId) {
    expect(object.get('id')).toBe(crawledStoreProductId);
  }

  if (expectedStore) {
    expect(object.get('store')).toEqual(expectedStore);
  }

  if (expectedStoreTags) {
    expect(object.get('storeTagIds')).toEqual(expectedStoreTags.map(_ => _.get('id')));
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createCrawledStoreProduct()).className).toBe('CrawledStoreProduct');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { crawledStoreProduct } = await createCrawledStoreProductInfo();
    const object = await createCrawledStoreProduct(crawledStoreProduct);
    const info = object.getInfo();

    expectCrawledStoreProduct(info, crawledStoreProduct);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createCrawledStoreProduct();

    expect(new CrawledStoreProduct(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createCrawledStoreProduct();

    expect(new CrawledStoreProduct(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createCrawledStoreProduct();
    const { crawledStoreProduct: updatedCrawledStoreProduct } = await createCrawledStoreProductInfo();

    object.updateInfo(updatedCrawledStoreProduct);

    const info = object.getInfo();

    expectCrawledStoreProduct(info, updatedCrawledStoreProduct);
  });

  test('getInfo should return provided info', async () => {
    const { crawledStoreProduct } = await createCrawledStoreProductInfo();
    const object = await createCrawledStoreProduct(crawledStoreProduct);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectCrawledStoreProduct(info, crawledStoreProduct);
  });
});
