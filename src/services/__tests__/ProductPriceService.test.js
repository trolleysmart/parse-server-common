// @flow

import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { ProductPriceService } from '../';
import { createLightWeigthProductPriceInfo } from '../../schema/__tests__/ProductPrice.test';
import { createStores } from './StoreService.test';
import { createTags } from './TagService.test';

const getRandomInt = (min, max) => {
  const intMin = Math.ceil(min);
  const intMax = Math.floor(max);

  return Math.floor(Math.random() * (intMax - intMin)) + intMin;
};

export const createProductPriceInfo = async () => {
  const store = (await createStores(1)).first();
  const tags = await createTags(getRandomInt(2, 10));

  return { productPrice: createLightWeigthProductPriceInfo({ storeId: store.get('id'), tagIds: tags.map(_ => _.get('id')) }), store, tags };
};

const expectProductPrice = (productPriceInfo, expectedProductPriceInfo, productPriceId, expectedStore, expectedTags) => {
  expect(productPriceInfo.get('id')).toBe(productPriceId);
  expect(productPriceInfo.get('name')).toBe(expectedProductPriceInfo.get('name'));
  expect(productPriceInfo.get('description')).toBe(expectedProductPriceInfo.get('description'));
  expect(productPriceInfo.get('priceDetails')).toEqual(expectedProductPriceInfo.get('priceDetails'));
  expect(productPriceInfo.get('priceToDisplay')).toEqual(expectedProductPriceInfo.get('priceToDisplay'));
  expect(productPriceInfo.get('saving')).toEqual(expectedProductPriceInfo.get('saving'));
  expect(productPriceInfo.get('savingPercentage')).toEqual(expectedProductPriceInfo.get('savingPercentage'));
  expect(productPriceInfo.get('offerEndDate')).toEqual(expectedProductPriceInfo.get('offerEndDate'));
  expect(productPriceInfo.get('status')).toEqual(expectedProductPriceInfo.get('status'));
  expect(productPriceInfo.get('store')).toEqual(expectedStore);
  expect(productPriceInfo.get('tags')).toEqual(expectedTags);
};

export const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('name', 'description', 'priceDetails', 'priceToDisplay', 'saving', 'savingPercentage', 'offerEndDate', 'status', 'store', 'tags'),
    includeStore: true,
    includeTags: true,
  });

export const createCriteria = productPriceInfo =>
  Map({
    conditions: Map({
      name: productPriceInfo ? productPriceInfo.get('name') : uuid(),
      description: productPriceInfo ? productPriceInfo.get('description') : uuid(),
      storeId: productPriceInfo ? productPriceInfo.get('storeId') : undefined,
      tags: productPriceInfo ? productPriceInfo.get('tags') : undefined,
    }),
  }).merge(createCriteriaWthoutConditions());

describe('create', () => {
  test('should return the created product price Id', async () => {
    const productPriceId = await ProductPriceService.create((await createProductPriceInfo()).productPrice);

    expect(productPriceId).toBeDefined();
  });

  test('should create the product price', async () => {
    const { productPrice } = await createProductPriceInfo();
    const productPriceId = await ProductPriceService.create(productPrice);
    const fetchedProductPrice = await ProductPriceService.read(productPriceId, createCriteriaWthoutConditions());

    expect(fetchedProductPrice).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided product price Id does not exist', async () => {
    const productPriceId = uuid();

    try {
      await ProductPriceService.read(productPriceId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No product price found with Id: ${productPriceId}`);
    }
  });

  test('should read the existing product price', async () => {
    const { productPrice: expectedProductPrice, store: expectedStore, tags: expectedTags } = await createProductPriceInfo();
    const productPriceId = await ProductPriceService.create(expectedProductPrice);
    const productPrice = await ProductPriceService.read(productPriceId, createCriteriaWthoutConditions());

    expectProductPrice(productPrice, expectedProductPrice, productPriceId, expectedStore, expectedTags);
  });
});

describe('update', () => {
  test('should reject if the provided product price Id does not exist', async () => {
    const productPriceId = uuid();

    try {
      const productPrice = await ProductPriceService.read(
        await ProductPriceService.create((await createProductPriceInfo()).productPrice),
        createCriteriaWthoutConditions(),
      );

      await ProductPriceService.update(productPrice.set('id', productPriceId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No product price found with Id: ${productPriceId}`);
    }
  });

  test('should return the Id of the updated product price', async () => {
    const { productPrice: expectedProductPrice } = await createProductPriceInfo();
    const productPriceId = await ProductPriceService.create((await createProductPriceInfo()).productPrice);
    const id = await ProductPriceService.update(expectedProductPrice.set('id', productPriceId));

    expect(id).toBe(productPriceId);
  });

  test('should update the existing product price', async () => {
    const { productPrice: expectedProductPrice, store: expectedStore, tags: expectedTags } = await createProductPriceInfo();
    const productPriceId = await ProductPriceService.create((await createProductPriceInfo()).productPrice);

    await ProductPriceService.update(expectedProductPrice.set('id', productPriceId));

    const productPrice = await ProductPriceService.read(productPriceId, createCriteriaWthoutConditions());

    expectProductPrice(productPrice, expectedProductPrice, productPriceId, expectedStore, expectedTags);
  });
});

describe('delete', () => {
  test('should reject if the provided product price Id does not exist', async () => {
    const productPriceId = uuid();

    try {
      await ProductPriceService.delete(productPriceId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No product price found with Id: ${productPriceId}`);
    }
  });

  test('should delete the existing product price', async () => {
    const productPriceId = await ProductPriceService.create((await createProductPriceInfo()).productPrice);
    await ProductPriceService.delete(productPriceId);

    try {
      await ProductPriceService.delete(productPriceId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No product price found with Id: ${productPriceId}`);
    }
  });
});

describe('search', () => {
  test('should return no product price if provided criteria matches no product price', async () => {
    const productPrices = await ProductPriceService.search(createCriteria());

    expect(productPrices.count()).toBe(0);
  });

  test('should return the products price matches the criteria', async () => {
    const { productPrice: expectedProductPrice, store: expectedStore, tags: expectedTags } = await createProductPriceInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, getRandomInt(2, 5)).map(async () => ProductPriceService.create(expectedProductPrice)).toArray()),
    );

    const productPrices = await ProductPriceService.search(createCriteria(expectedProductPrice));

    expect(productPrices.count).toBe(results.count);

    productPrices.forEach((productPrice) => {
      expect(results.find(_ => _.localeCompare(productPrice.get('id')) === 0)).toBeDefined();
      expectProductPrice(productPrice, expectedProductPrice, productPrice.get('id'), expectedStore, expectedTags);
    });
  });
});
