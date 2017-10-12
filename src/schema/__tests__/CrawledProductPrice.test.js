// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { CrawledProductPrice } from '../';
import createStores from '../../services/__tests__/StoreService.test';
import createTags from '../../services/__tests__/TagService.test';
import createCrawledStoreProducts from '../../services/__tests__/CrawledStoreProductService.test';

const chance = new Chance();

export const createCrawledProductPriceInfo = async () => {
  const store = (await createStores(1)).first();
  const tags = await createTags(chance.integer({ min: 1, max: 10 }));
  const crawledStoreProduct = (await createCrawledStoreProducts(1)).first();
  const crawledProductPrice = Map({
    name: uuid(),
    description: uuid(),
    priceDetails: Map({
      price: chance.floating({ min: 0, max: 1000 }),
    }),
    priceToDisplay: chance.floating({ min: 0, max: 1000 }),
    saving: chance.floating({ min: 0, max: 1000 }),
    savingPercentage: chance.floating({ min: 0, max: 100 }),
    offerEndDate: new Date(),
    status: uuid(),
    special: chance.integer({ min: 0, max: 1000 }) % 2 === 0,
    barcode: uuid(),
    size: uuid(),
    imageUrl: uuid(),
    productPageUrl: uuid(),
    storeId: store.get('id'),
    tagIds: tags.map(tag => tag.get('id')),
    crawledStoreProductId: crawledStoreProduct.get('id'),
  });

  return {
    crawledProductPrice,
    store,
    tags,
    crawledStoreProduct,
  };
};

export const createCrawledProductPrice = async object =>
  CrawledProductPrice.spawn(object || (await createCrawledProductPriceInfo()).crawledProductPrice);

export const expectCrawledProductPrice = (
  object,
  expectedObject,
  {
    crawledProductPriceId, expectedStore, expectedTags, expectedCrawledStoreProduct,
  } = {},
) => {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('priceDetails')).toEqual(expectedObject.get('priceDetails'));
  expect(object.get('priceToDisplay')).toBe(expectedObject.get('priceToDisplay'));
  expect(object.get('saving')).toBe(expectedObject.get('saving'));
  expect(object.get('savingPercentage')).toBe(expectedObject.get('savingPercentage'));
  expect(object.get('offerEndDate')).toEqual(expectedObject.get('offerEndDate'));
  expect(object.get('status')).toBe(expectedObject.get('status'));
  expect(object.get('special')).toBe(expectedObject.get('special'));
  expect(object.get('barcode')).toBe(expectedObject.get('barcode'));
  expect(object.get('size')).toBe(expectedObject.get('size'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('productPageUrl')).toBe(expectedObject.get('productPageUrl'));
  expect(object.get('storeId')).toBe(expectedObject.get('storeId'));
  expect(object.get('tagIds')).toEqual(expectedObject.get('tagIds'));
  expect(object.get('crawledStoreProductId')).toBe(expectedObject.get('crawledStoreProductId'));

  if (crawledProductPriceId) {
    expect(object.get('id')).toBe(crawledProductPriceId);
  }

  if (expectedStore) {
    expect(object.get('store')).toEqual(expectedStore);
  }

  if (expectedTags) {
    expect(object.get('tags')).toEqual(expectedTags);
  }

  if (expectedCrawledStoreProduct) {
    expect(object.get('crawledStoreProductId')).toBe(expectedCrawledStoreProduct.get('id'));
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createCrawledProductPrice()).className).toBe('CrawledProductPrice');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { crawledProductPrice } = await createCrawledProductPriceInfo();
    const object = await createCrawledProductPrice(crawledProductPrice);
    const info = object.getInfo();

    expectCrawledProductPrice(info, crawledProductPrice);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createCrawledProductPrice();

    expect(new CrawledProductPrice(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createCrawledProductPrice();

    expect(new CrawledProductPrice(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createCrawledProductPrice();
    const { crawledProductPrice: updatedCrawledProductPrice } = await createCrawledProductPriceInfo();

    object.updateInfo(updatedCrawledProductPrice);

    const info = object.getInfo();

    expectCrawledProductPrice(info, updatedCrawledProductPrice);
  });

  test('getInfo should return provided info', async () => {
    const { crawledProductPrice } = await createCrawledProductPriceInfo();
    const object = await createCrawledProductPrice(crawledProductPrice);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectCrawledProductPrice(info, crawledProductPrice);
  });
});
