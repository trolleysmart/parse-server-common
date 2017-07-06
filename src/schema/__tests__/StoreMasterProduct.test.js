// @flow

import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { StoreMasterProduct } from '../';

export function createStoreMasterProductInfo(storeTagIds, storeId, tagId) {
  const info = Map({
    name: uuid(),
    description: uuid(),
    barcode: uuid(),
    productPageUrl: uuid(),
    imageUrl: uuid(),
    size: uuid(),
    lasCrawlDateTime: new Date(),
  });

  const infoWithStoreTagIds = storeTagIds
    ? info.merge({
      storeTagIds,
    })
    : info;

  const infoWithStore = storeId ? infoWithStoreTagIds.merge({ storeId }) : infoWithStoreTagIds;

  return tagId ? infoWithStore.merge({ tagId }) : infoWithStore;
}

export function createStoreMasterProduct(storeStoreMasterProductInfo) {
  return StoreMasterProduct.spawn(storeStoreMasterProductInfo || createStoreMasterProductInfo());
}

function expectStoreMasterProductInfo(storeStoreMasterProductInfo, expectedStoreMasterProductInfo) {
  expect(storeStoreMasterProductInfo.get('name')).toBe(expectedStoreMasterProductInfo.get('name'));
  expect(storeStoreMasterProductInfo.get('description')).toBe(expectedStoreMasterProductInfo.get('description'));
  expect(storeStoreMasterProductInfo.get('barcode')).toBe(expectedStoreMasterProductInfo.get('barcode'));
  expect(storeStoreMasterProductInfo.get('productPageUrl')).toBe(expectedStoreMasterProductInfo.get('productPageUrl'));
  expect(storeStoreMasterProductInfo.get('imageUrl')).toBe(expectedStoreMasterProductInfo.get('imageUrl'));
  expect(storeStoreMasterProductInfo.get('size')).toBe(expectedStoreMasterProductInfo.get('size'));
  expect(storeStoreMasterProductInfo.get('lastCrawlDateTime')).toBe(expectedStoreMasterProductInfo.get('lastCrawlDateTime'));
  expect(storeStoreMasterProductInfo.get('storeTags')).toBe(expectedStoreMasterProductInfo.get('storeTags'));
  expect(storeStoreMasterProductInfo.get('storeId')).toBe(expectedStoreMasterProductInfo.get('storeId'));
  expect(storeStoreMasterProductInfo.get('masterProductId')).toBe(expectedStoreMasterProductInfo.get('masterProductId'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createStoreMasterProduct().className).toBe('StoreMasterProduct');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const storeStoreMasterProductInfo = createStoreMasterProductInfo();
    const object = createStoreMasterProduct(storeStoreMasterProductInfo);
    const info = object.getInfo();

    expectStoreMasterProductInfo(info, storeStoreMasterProductInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = createStoreMasterProduct();

    expect(new StoreMasterProduct(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createStoreMasterProduct();

    expect(new StoreMasterProduct(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createStoreMasterProduct();
    const updatedStoreMasterProductInfo = createStoreMasterProductInfo();

    object.updateInfo(updatedStoreMasterProductInfo);

    const info = object.getInfo();

    expectStoreMasterProductInfo(info, updatedStoreMasterProductInfo);
  });

  test('getInfo should return provided info', () => {
    const storeStoreMasterProductInfo = createStoreMasterProductInfo();
    const object = createStoreMasterProduct(storeStoreMasterProductInfo);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectStoreMasterProductInfo(info, storeStoreMasterProductInfo);
  });
});
