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

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('name', 'description', 'priceDetails', 'priceToDisplay', 'saving', 'savingPercentage', 'offerEndDate', 'status', 'store', 'tags'),
    includeStore: true,
    includeTags: true,
  });

const createCriteria = productPrice =>
  Map({
    conditions: Map({
      name: productPrice ? productPrice.get('name') : uuid(),
      description: productPrice ? productPrice.get('description') : uuid(),
      priceDetails: productPrice ? productPrice.get('priceDetails') : Map({ price: getRandomInt(1, 1000) }),
      priceToDisplay: productPrice ? productPrice.get('priceToDisplay') : getRandomInt(1, 1000),
      saving: productPrice ? productPrice.get('saving') : getRandomInt(1, 1000),
      savingPercentage: productPrice ? productPrice.get('savingPercentage') : getRandomInt(1, 1000),
      offerEndDate: productPrice ? productPrice.get('offerEndDate') : new Date(),
      status: productPrice ? productPrice.get('status') : uuid(),
      storeId: productPrice ? productPrice.get('storeId') : undefined,
      tagIds: productPrice ? productPrice.get('tagIds') : undefined,
    }),
  }).merge(createCriteriaWthoutConditions());

const expectProductPrice = (productPrice, expectedProductPrice, productPriceId, expectedStore, expectedTags) => {
  expect(productPrice.get('id')).toBe(productPriceId);
  expect(productPrice.get('name')).toBe(expectedProductPrice.get('name'));
  expect(productPrice.get('description')).toBe(expectedProductPrice.get('description'));
  expect(productPrice.get('priceDetails')).toEqual(expectedProductPrice.get('priceDetails'));
  expect(productPrice.get('priceToDisplay')).toEqual(expectedProductPrice.get('priceToDisplay'));
  expect(productPrice.get('saving')).toEqual(expectedProductPrice.get('saving'));
  expect(productPrice.get('savingPercentage')).toEqual(expectedProductPrice.get('savingPercentage'));
  expect(productPrice.get('offerEndDate')).toEqual(expectedProductPrice.get('offerEndDate'));
  expect(productPrice.get('status')).toEqual(expectedProductPrice.get('status'));
  expect(productPrice.get('store')).toEqual(expectedStore);
  expect(productPrice.get('tags')).toEqual(expectedTags);
};

export const createProductPriceInfo = async () => {
  const store = (await createStores(1)).first();
  const tags = await createTags(getRandomInt(1, 10));

  return { productPrice: createLightWeigthProductPriceInfo({ storeId: store.get('id'), tagIds: tags.map(_ => _.get('id')) }), store, tags };
};

export const createProductPrices = async (count, useSameInfo = false) => {
  let productPrice;

  if (useSameInfo) {
    const { productPrice: tempProductPrice } = await createProductPriceInfo();

    productPrice = tempProductPrice;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalProductPrice;

          if (useSameInfo) {
            finalProductPrice = productPrice;
          } else {
            const { productPrice: tempProductPrice } = await createProductPriceInfo();

            finalProductPrice = tempProductPrice;
          }

          return ProductPriceService.read(await ProductPriceService.create(finalProductPrice), createCriteriaWthoutConditions());
        })
        .toArray(),
    ),
  );
};

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

describe('searchAll', () => {
  test('should return no product price if provided criteria matches no product price', async () => {
    let productPrices = List();
    const result = ProductPriceService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        productPrices = productPrices.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(productPrices.count()).toBe(0);
  });

  test('should return the products price matches the criteria', async () => {
    const { productPrice: expectedProductPrice, store: expectedStore, tags: expectedTags } = await createProductPriceInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, getRandomInt(2, 5)).map(async () => ProductPriceService.create(expectedProductPrice)).toArray()),
    );

    let productPrices = List();
    const result = ProductPriceService.searchAll(createCriteria(expectedProductPrice));

    try {
      result.event.subscribe((info) => {
        productPrices = productPrices.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(productPrices.count).toBe(results.count);
    productPrices.forEach((productPrice) => {
      expect(results.find(_ => _.localeCompare(productPrice.get('id')) === 0)).toBeDefined();
      expectProductPrice(productPrice, expectedProductPrice, productPrice.get('id'), expectedStore, expectedTags);
    });
  });
});

describe('exists', () => {
  test('should return false if no product price match provided criteria', async () => {
    expect(await ProductPriceService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any product price match provided criteria', async () => {
    const productPrices = await createProductPrices(getRandomInt(1, 10), true);

    expect(await ProductPriceService.exists(createCriteria(productPrices.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no master product price match provided criteria', async () => {
    expect(await ProductPriceService.count(createCriteria())).toBe(0);
  });

  test('should return the count of master product price match provided criteria', async () => {
    const productPrices = await createProductPrices(getRandomInt(1, 10), true);

    expect(await ProductPriceService.count(createCriteria(productPrices.first()))).toBe(productPrices.count());
  });
});
