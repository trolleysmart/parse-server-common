import {
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import {
  MasterProductPrice,
} from './master-product-price';
import {
  createMasterProduct,
} from './master-product.test';

export function createMasterProductPriceInfo(masterProductId) {
  return Map({
    masterProductId: masterProductId || createMasterProduct()
      .getId(),
    priceDetails: Map({
      price: uuid(),
    }),
  });
}

export function createMasterProductPrice(masterProductPriceInfo) {
  return MasterProductPrice.spawn(masterProductPriceInfo || createMasterProductPriceInfo());
}

function expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo) {
  expect(masterProductPriceInfo.get('masterProduct')
      .getId())
    .toBe(expectedMasterProductPriceInfo.get('masterProductId'));
  expect(masterProductPriceInfo.get('priceDetails'))
    .toEqual(expectedMasterProductPriceInfo.get('priceDetails'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createMasterProductPrice()
        .className)
      .toBe('MasterProductPrice');
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

    expect(new MasterProductPrice(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createMasterProductPrice();

    expect(new MasterProductPrice(object)
        .getId())
      .toBe(object.id);
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

    expect(info.get('id'))
      .toBe(object.getId());
    expectMasterProductPriceInfo(info, masterProductPriceInfo);
  });
});
