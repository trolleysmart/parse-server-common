import {
  List,
  Map,
} from 'immutable';
import {
  Maybe,
} from 'monet';
import uuid from 'uuid/v4';
import {
  MasterProduct,
} from './master-product';

export function createMasterProductInfo() {
  return Map({
    description: uuid(),
    barcode: Maybe.Some(uuid()),
    imageUrl: Maybe.Some(uuid()),
    tags: Maybe.Some(List.of(uuid(), uuid())),
  });
}

export function createMasterProduct(masterProductInfo) {
  return MasterProduct.spawn(masterProductInfo || createMasterProductInfo());
}

function expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo) {
  expect(masterProductInfo.get('description'))
    .toBe(expectedMasterProductInfo.get('description'));
  expect(masterProductInfo.get('barcode')
      .some())
    .toBe(expectedMasterProductInfo.get('barcode')
      .some());
  expect(masterProductInfo.get('imageUrl')
      .some())
    .toBe(expectedMasterProductInfo.get('imageUrl')
      .some());
  expect(masterProductInfo.get('tags')
      .some())
    .toEqual(expectedMasterProductInfo.get('tags')
      .some());
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createMasterProduct()
        .className)
      .toBe('MasterProduct');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const masterProductInfo = createMasterProductInfo();
    const object = createMasterProduct(masterProductInfo);
    const info = object.getInfo();

    expectMasterProductInfo(info, masterProductInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = createMasterProduct();

    expect(new MasterProduct(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createMasterProduct();

    expect(new MasterProduct(object)
        .getId())
      .toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createMasterProduct();
    const updatedMasterProductInfo = createMasterProductInfo();

    object.updateInfo(updatedMasterProductInfo);

    const info = object.getInfo();

    expectMasterProductInfo(info, updatedMasterProductInfo);
  });

  test('getInfo should return provided info', () => {
    const masterProductInfo = createMasterProductInfo();
    const object = createMasterProduct(masterProductInfo);
    const info = object.getInfo();

    expect(info.get('id'))
      .toBe(object.getId());
    expectMasterProductInfo(info, masterProductInfo);
  });
});
