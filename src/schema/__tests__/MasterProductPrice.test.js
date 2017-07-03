// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { MasterProductPrice } from '../';
import { createMasterProduct } from './MasterProduct.test';
import { createStore } from './Store.test';

export function createMasterProductPriceInfo(masterProductId, storeId) {
  return Map({
    name: uuid(),
    storeName: uuid(),
    priceDetails: Map({
      price: uuid(),
    }),
    priceToDisplay: 12.34,
    status: 'A',
    masterProductId: masterProductId || createMasterProduct().getId(),
    storeId: storeId || createStore().getId(),
  });
}

export function createMasterProductPrice(masterProductPriceInfo) {
  return MasterProductPrice.spawn(masterProductPriceInfo || createMasterProductPriceInfo());
}

function expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo) {
  expect(masterProductPriceInfo.get('name')).toBe(expectedMasterProductPriceInfo.get('name'));
  expect(masterProductPriceInfo.get('storeName')).toBe(expectedMasterProductPriceInfo.get('storeName'));
  expect(masterProductPriceInfo.get('priceDetails')).toEqual(expectedMasterProductPriceInfo.get('priceDetails'));
  expect(masterProductPriceInfo.get('priceToDisplay')).toEqual(expectedMasterProductPriceInfo.get('priceToDisplay'));
  expect(masterProductPriceInfo.get('status')).toEqual(expectedMasterProductPriceInfo.get('status'));
  expect(masterProductPriceInfo.get('masterProductId')).toBe(expectedMasterProductPriceInfo.get('masterProductId'));
  expect(masterProductPriceInfo.get('storeId')).toBe(expectedMasterProductPriceInfo.get('storeId'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createMasterProductPrice().className).toBe('MasterProductPrice');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const masterProductPriceInfo = createMasterProductPriceInfo();
    const object = createMasterProductPrice(masterProductPriceInfo);
    const info = object.getInfo();

    expectMasterProductPriceInfo(info, masterProductPriceInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = createMasterProductPrice();

    expect(new MasterProductPrice(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createMasterProductPrice();

    expect(new MasterProductPrice(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createMasterProductPrice();
    const updatedMasterProductPriceInfo = createMasterProductPriceInfo();

    object.updateInfo(updatedMasterProductPriceInfo);

    const info = object.getInfo();

    expectMasterProductPriceInfo(info, updatedMasterProductPriceInfo);
  });

  test('getInfo should return provided info', () => {
    const masterProductPriceInfo = createMasterProductPriceInfo();
    const object = createMasterProductPrice(masterProductPriceInfo);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectMasterProductPriceInfo(info, masterProductPriceInfo);
  });
});
