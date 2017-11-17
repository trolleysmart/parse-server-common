// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { MasterProduct } from '../';
import createTags from '../../services/__tests__/TagService.test';

const chance = new Chance();

export const createMasterProductInfo = async () => {
  const tags = await createTags(chance.integer({ min: 1, max: 1 }));
  const masterProduct = Map({
    name: uuid(),
    description: uuid(),
    barcode: uuid(),
    imageUrl: uuid(),
    size: uuid(),
    tagIds: tags.map(tag => tag.get('id')),
  });

  return {
    masterProduct,
    tags,
  };
};

export const createMasterProduct = async object => MasterProduct.spawn(object || (await createMasterProductInfo()).masterProduct);

export const expectMasterProduct = (object, expectedObject, { masterProductId, expectedTags } = {}) => {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('barcode')).toBe(expectedObject.get('barcode'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('size')).toBe(expectedObject.get('size'));
  expect(object.get('tagIds')).toEqual(expectedObject.get('tagIds'));

  if (masterProductId) {
    expect(object.get('id')).toBe(masterProductId);
  }

  if (expectedTags) {
    expect(object.get('tagIds')).toEqual(expectedTags.map(_ => _.get('id')));
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createMasterProduct()).className).toBe('MasterProduct');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { masterProduct } = await createMasterProductInfo();
    const object = await createMasterProduct(masterProduct);
    const info = object.getInfo();

    expectMasterProduct(info, masterProduct);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createMasterProduct();

    expect(new MasterProduct(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createMasterProduct();

    expect(new MasterProduct(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createMasterProduct();
    const { masterProduct: updatedMasterProduct } = await createMasterProductInfo();

    object.updateInfo(updatedMasterProduct);

    const info = object.getInfo();

    expectMasterProduct(info, updatedMasterProduct);
  });

  test('getInfo should return provided info', async () => {
    const { masterProduct } = await createMasterProductInfo();
    const object = await createMasterProduct(masterProduct);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectMasterProduct(info, masterProduct);
  });
});
