// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { ProductPrice } from '../';
import { createStore } from './Store.test';

export function createLightWeigthProductPriceInfo({ storeId, tagIds } = {}) {
  return Map({
    name: uuid(),
    description: uuid(),
    priceDetails: Map({
      price: 10.56,
    }),
    priceToDisplay: 12.34,
    saving: 2.3,
    savingPercentage: 12,
    offerEndDate: new Date(),
    status: 'A',
    storeId: storeId || createStore().getId(),
  }).merge(tagIds ? Map({ tagIds }) : Map());
}

export function createProductPrice(productPriceInfo) {
  return ProductPrice.spawn(productPriceInfo || createLightWeigthProductPriceInfo());
}

function expectProductPriceInfo(productPriceInfo, expectedProductPriceInfo) {
  expect(productPriceInfo.get('name')).toBe(expectedProductPriceInfo.get('name'));
  expect(productPriceInfo.get('description')).toBe(expectedProductPriceInfo.get('description'));
  expect(productPriceInfo.get('priceDetails')).toEqual(expectedProductPriceInfo.get('priceDetails'));
  expect(productPriceInfo.get('priceToDisplay')).toEqual(expectedProductPriceInfo.get('priceToDisplay'));
  expect(productPriceInfo.get('saving')).toEqual(expectedProductPriceInfo.get('saving'));
  expect(productPriceInfo.get('savingPercentage')).toEqual(expectedProductPriceInfo.get('savingPercentage'));
  expect(productPriceInfo.get('offerEndDate')).toEqual(expectedProductPriceInfo.get('offerEndDate'));
  expect(productPriceInfo.get('status')).toEqual(expectedProductPriceInfo.get('status'));
  expect(productPriceInfo.get('storeId')).toBe(expectedProductPriceInfo.get('storeId'));
  expect(productPriceInfo.get('tags')).toEqual(expectedProductPriceInfo.get('tags'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createProductPrice().className).toBe('ProductPrice');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const productPriceInfo = createLightWeigthProductPriceInfo();
    const object = createProductPrice(productPriceInfo);
    const info = object.getInfo();

    expectProductPriceInfo(info, productPriceInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = createProductPrice();

    expect(new ProductPrice(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createProductPrice();

    expect(new ProductPrice(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createProductPrice();
    const updatedProductPriceInfo = createLightWeigthProductPriceInfo();

    object.updateInfo(updatedProductPriceInfo);

    const info = object.getInfo();

    expectProductPriceInfo(info, updatedProductPriceInfo);
  });

  test('getInfo should return provided info', () => {
    const productPriceInfo = createLightWeigthProductPriceInfo();
    const object = createProductPrice(productPriceInfo);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectProductPriceInfo(info, productPriceInfo);
  });
});
