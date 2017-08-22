// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { ProductPrice } from '../';
import createStores from '../../services/__tests__/StoreService.test';
import createTags from '../../services/__tests__/TagService.test';

const chance = new Chance();

export const createProductPriceInfo = async () => {
  const store = (await createStores(1)).first();
  const tags = await createTags(chance.integer({ min: 1, max: 10 }));
  const productPrice = Map({
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
    storeId: store.get('id'),
    tagIds: tags.map(tag => tag.get('id')),
  });

  return { productPrice, store, tags };
};

export const createProductPrice = async object => ProductPrice.spawn(object || (await createProductPriceInfo()).productPrice);

export const expectProductPrice = (object, expectedObject, { productPriceId, expectedStore, expectedTags } = {}) => {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('priceDetails')).toEqual(expectedObject.get('priceDetails'));
  expect(object.get('priceToDisplay')).toEqual(expectedObject.get('priceToDisplay'));
  expect(object.get('saving')).toEqual(expectedObject.get('saving'));
  expect(object.get('savingPercentage')).toEqual(expectedObject.get('savingPercentage'));
  expect(object.get('offerEndDate')).toEqual(expectedObject.get('offerEndDate'));
  expect(object.get('status')).toEqual(expectedObject.get('status'));

  if (productPriceId) {
    expect(object.get('id')).toBe(productPriceId);
  }

  if (expectedStore) {
    expect(object.get('store')).toEqual(expectedStore);
  }

  if (expectedTags) {
    expect(object.get('tags')).toEqual(expectedTags);
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createProductPrice()).className).toBe('ProductPrice');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { productPrice } = await createProductPriceInfo();
    const object = await createProductPrice(productPrice);
    const info = object.getInfo();

    expectProductPrice(info, productPrice);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createProductPrice();

    expect(new ProductPrice(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createProductPrice();

    expect(new ProductPrice(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createProductPrice();
    const { productPrice: updatedProductPrice } = await createProductPriceInfo();

    object.updateInfo(updatedProductPrice);

    const info = object.getInfo();

    expectProductPrice(info, updatedProductPrice);
  });

  test('getInfo should return provided info', async () => {
    const { productPrice } = await createProductPriceInfo();
    const object = await createProductPrice(productPrice);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectProductPrice(info, productPrice);
  });
});
