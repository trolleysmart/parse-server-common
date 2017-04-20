import uuid from 'uuid/v4';
import {
  MasterProduct,
} from './master-product';

describe('constructor', () => {
  test('should set class name', () => {
    expect(MasterProduct.spawn('key', 'config')
        .className)
      .toBe('MasterProduct');
  });
});

describe('static public methods', () => {
  test('spawn should set provided description', () => {
    const expectedValue = uuid();

    expect(MasterProduct.spawn(expectedValue, 'barcode', 'imageUrl')
        .get('description'))
      .toBe(expectedValue);
  });

  test('spawn should set provided barcode', () => {
    const expectedValue = uuid();

    expect(MasterProduct.spawn('description', expectedValue, 'imageUrl')
        .get('barcode'))
      .toBe(expectedValue);
  });

  test('spawn should set provided imageUrl', () => {
    const expectedValue = uuid();

    expect(MasterProduct.spawn('description', 'barcode', expectedValue)
        .get('imageUrl'))
      .toBe(expectedValue);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = MasterProduct.spawn('description', 'barcode', 'imageUrl');

    expect(new MasterProduct(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = MasterProduct.spawn('description', 'barcode', 'imageUrl');

    expect(new MasterProduct(object)
        .getId())
      .toBe(object.id);
  });

  test('getDescription should return provided description', () => {
    const expectedValue = uuid();
    const object = MasterProduct.spawn(expectedValue, 'barcode', 'imageUrl');

    expect(new MasterProduct(object)
        .getDescription())
      .toBe(expectedValue);
  });

  test('getBarcode should return provided barcode', () => {
    const expectedValue = uuid();
    const object = MasterProduct.spawn('description', expectedValue, 'imageUrl');

    expect(new MasterProduct(object)
        .getBarcode().some())
      .toBe(expectedValue);
  });

  test('getImageUrl should return provided imageUrl;', () => {
    const expectedValue = uuid();
    const object = MasterProduct.spawn('description', 'barcode', expectedValue);

    expect(new MasterProduct(object)
        .getImageUrl().some())
      .toBe(expectedValue);
  });
});
