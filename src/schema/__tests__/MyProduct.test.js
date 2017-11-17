// @flow

import Chance from 'chance';
import { Map } from 'immutable';
import { ParseWrapperService } from 'micro-business-parse-server-common';
import uuid from 'uuid/v4';
import { MyProduct } from '../';
import createTags from '../../services/__tests__/TagService.test';

const chance = new Chance();

export const createMyProductInfo = async () => {
  const ownedByUser = await ParseWrapperService.createNewUser({ username: `${uuid()}@email.com`, password: '123456' }).signUp();
  const tags = await createTags(chance.integer({ min: 1, max: 1 }));
  const myProduct = Map({
    name: uuid(),
    description: uuid(),
    barcode: uuid(),
    productPageUrl: uuid(),
    imageUrl: uuid(),
    size: uuid(),
    tagIds: tags.map(tag => tag.get('id')),
    ownedByUserId: ownedByUser.id,
  });

  return {
    myProduct,
    tags,
    ownedByUser,
  };
};

export const createMyProduct = async object => MyProduct.spawn(object || (await createMyProductInfo()).myProduct);

export const expectMyProduct = (object, expectedObject, { myProductId, expectedTags } = {}) => {
  expect(object.get('name')).toBe(expectedObject.get('name'));
  expect(object.get('description')).toBe(expectedObject.get('description'));
  expect(object.get('barcode')).toBe(expectedObject.get('barcode'));
  expect(object.get('productPageUrl')).toBe(expectedObject.get('productPageUrl'));
  expect(object.get('imageUrl')).toBe(expectedObject.get('imageUrl'));
  expect(object.get('size')).toBe(expectedObject.get('size'));
  expect(object.get('tagIds')).toEqual(expectedObject.get('tagIds'));
  expect(object.get('ownedByUserId')).toBe(expectedObject.get('ownedByUserId'));

  if (myProductId) {
    expect(object.get('id')).toBe(myProductId);
  }

  if (expectedTags) {
    expect(object.get('tagIds')).toEqual(expectedTags.map(_ => _.get('id')));
  }
};

describe('constructor', () => {
  test('should set class name', async () => {
    expect((await createMyProduct()).className).toBe('MyProduct');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', async () => {
    const { myProduct } = await createMyProductInfo();
    const object = await createMyProduct(myProduct);
    const info = object.getInfo();

    expectMyProduct(info, myProduct);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', async () => {
    const object = await createMyProduct();

    expect(new MyProduct(object).getObject()).toBe(object);
  });

  test('getId should return provided object Id', async () => {
    const object = await createMyProduct();

    expect(new MyProduct(object).getId()).toBe(object.id);
  });

  test('updateInfo should update object info', async () => {
    const object = await createMyProduct();
    const { myProduct: updatedMyProduct } = await createMyProductInfo();

    object.updateInfo(updatedMyProduct);

    const info = object.getInfo();

    expectMyProduct(info, updatedMyProduct);
  });

  test('getInfo should return provided info', async () => {
    const { myProduct } = await createMyProductInfo();
    const object = await createMyProduct(myProduct);
    const info = object.getInfo();

    expect(info.get('id')).toBe(object.getId());
    expectMyProduct(info, myProduct);
  });
});
