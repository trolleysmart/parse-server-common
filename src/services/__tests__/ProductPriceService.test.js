// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { ProductPriceService } from '../';
import { createProductPriceInfo, expectProductPrice } from '../../schema/__tests__/ProductPrice.test';

const chance = new Chance();
const productPriceService = new ProductPriceService();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of(
      'name',
      'description',
      'priceDetails',
      'priceToDisplay',
      'saving',
      'savingPercentage',
      'offerEndDate',
      'status',
      'special',
      'store',
      'tags',
      'storeProduct',
    ),
    include_store: true,
    include_tags: true,
    include_storeProduct: true,
  });

const createCriteria = productPrice =>
  Map({
    conditions: Map({
      name: productPrice ? productPrice.get('name') : uuid(),
      description: productPrice ? productPrice.get('description') : uuid(),
      priceDetails: productPrice ? productPrice.get('priceDetails') : Map({ price: chance.floating({ min: 0, max: 1000 }) }),
      priceToDisplay: productPrice ? productPrice.get('priceToDisplay') : chance.floating({ min: 0, max: 1000 }),
      saving: productPrice ? productPrice.get('saving') : chance.floating({ min: 0, max: 1000 }),
      savingPercentage: productPrice ? productPrice.get('savingPercentage') : chance.floating({ min: 0, max: 100 }),
      offerEndDate: productPrice ? productPrice.get('offerEndDate') : new Date(),
      status: productPrice ? productPrice.get('status') : uuid(),
      special: productPrice ? productPrice.get('special') : chance.integer({ min: 0, max: 1000 }) % 2 === 0,
      storeId: productPrice ? productPrice.get('storeId') : uuid(),
      tagIds: productPrice ? productPrice.get('tagIds') : List.of(uuid(), uuid()),
      storeProductId: productPrice ? productPrice.get('storeProductId') : uuid(),
    }),
  }).merge(createCriteriaWthoutConditions());

const createProductPrices = async (count, useSameInfo = false) => {
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

          return productPriceService.read(await productPriceService.create(finalProductPrice), createCriteriaWthoutConditions());
        })
        .toArray(),
    ),
  );
};

export default createProductPrices;

describe('create', () => {
  test('should return the created product price Id', async () => {
    const productPriceId = await productPriceService.create((await createProductPriceInfo()).productPrice);

    expect(productPriceId).toBeDefined();
  });

  test('should create the product price', async () => {
    const { productPrice } = await createProductPriceInfo();
    const productPriceId = await productPriceService.create(productPrice);
    const fetchedProductPrice = await productPriceService.read(productPriceId, createCriteriaWthoutConditions());

    expect(fetchedProductPrice).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided product price Id does not exist', async () => {
    const productPriceId = uuid();

    try {
      await productPriceService.read(productPriceId);
    } catch (ex) {
      expect(ex.message).toBe(`No product price found with Id: ${productPriceId}`);
    }
  });

  test('should read the existing product price', async () => {
    const {
      productPrice: expectedProductPrice,
      store: expectedStore,
      tags: expectedTags,
      storeProduct: expectedStoreProduct,
    } = await createProductPriceInfo();
    const productPriceId = await productPriceService.create(expectedProductPrice);
    const productPrice = await productPriceService.read(productPriceId, createCriteriaWthoutConditions());

    expectProductPrice(productPrice, expectedProductPrice, { productPriceId, expectedStore, expectedTags, expectedStoreProduct });
  });
});

describe('update', () => {
  test('should reject if the provided product price Id does not exist', async () => {
    const productPriceId = uuid();

    try {
      const productPrice = await productPriceService.read(
        await productPriceService.create((await createProductPriceInfo()).productPrice),
        createCriteriaWthoutConditions(),
      );

      await productPriceService.update(productPrice.set('id', productPriceId));
    } catch (ex) {
      expect(ex.message).toBe(`No product price found with Id: ${productPriceId}`);
    }
  });

  test('should return the Id of the updated product price', async () => {
    const { productPrice: expectedProductPrice } = await createProductPriceInfo();
    const productPriceId = await productPriceService.create((await createProductPriceInfo()).productPrice);
    const id = await productPriceService.update(expectedProductPrice.set('id', productPriceId));

    expect(id).toBe(productPriceId);
  });

  test('should update the existing product price', async () => {
    const {
      productPrice: expectedProductPrice,
      store: expectedStore,
      tags: expectedTags,
      storeProduct: expectedStoreProduct,
    } = await createProductPriceInfo();
    const productPriceId = await productPriceService.create((await createProductPriceInfo()).productPrice);

    await productPriceService.update(expectedProductPrice.set('id', productPriceId));

    const productPrice = await productPriceService.read(productPriceId, createCriteriaWthoutConditions());

    expectProductPrice(productPrice, expectedProductPrice, { productPriceId, expectedStore, expectedTags, expectedStoreProduct });
  });
});

describe('delete', () => {
  test('should reject if the provided product price Id does not exist', async () => {
    const productPriceId = uuid();

    try {
      await productPriceService.delete(productPriceId);
    } catch (ex) {
      expect(ex.message).toBe(`No product price found with Id: ${productPriceId}`);
    }
  });

  test('should delete the existing product price', async () => {
    const productPriceId = await productPriceService.create((await createProductPriceInfo()).productPrice);
    await productPriceService.delete(productPriceId);

    try {
      await productPriceService.delete(productPriceId);
    } catch (ex) {
      expect(ex.message).toBe(`No product price found with Id: ${productPriceId}`);
    }
  });
});

describe('search', () => {
  test('should return no product price if provided criteria matches no product price', async () => {
    const productPrices = await productPriceService.search(createCriteria());

    expect(productPrices.count()).toBe(0);
  });

  test('should return the product price matches the criteria', async () => {
    const {
      productPrice: expectedProductPrice,
      store: expectedStore,
      tags: expectedTags,
      storeProduct: expectedStoreProduct,
    } = await createProductPriceInfo();
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 }))
          .map(async () => productPriceService.create(expectedProductPrice))
          .toArray(),
      ),
    );
    const productPrices = await productPriceService.search(createCriteria(expectedProductPrice));

    expect(productPrices.count).toBe(results.count);
    productPrices.forEach((productPrice) => {
      expect(results.find(_ => _.localeCompare(productPrice.get('id')) === 0)).toBeDefined();
      expectProductPrice(productPrice, expectedProductPrice, {
        productPriceId: productPrice.get('id'),
        expectedStore,
        expectedTags,
        expectedStoreProduct,
      });
    });
  });
});

describe('searchAll', () => {
  test('should return no product price if provided criteria matches no product price', async () => {
    let productPrices = List();
    const result = productPriceService.searchAll(createCriteria());

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

  test('should return the product price matches the criteria', async () => {
    const {
      productPrice: expectedProductPrice,
      store: expectedStore,
      tags: expectedTags,
      storeProduct: expectedStoreProduct,
    } = await createProductPriceInfo();
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 }))
          .map(async () => productPriceService.create(expectedProductPrice))
          .toArray(),
      ),
    );

    let productPrices = List();
    const result = productPriceService.searchAll(createCriteria(expectedProductPrice));

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
      expectProductPrice(productPrice, expectedProductPrice, {
        productPriceId: productPrice.get('id'),
        expectedStore,
        expectedTags,
        expectedStoreProduct,
      });
    });
  });
});

describe('exists', () => {
  test('should return false if no product price match provided criteria', async () => {
    expect(await productPriceService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any product price match provided criteria', async () => {
    const productPrices = await createProductPrices(chance.integer({ min: 1, max: 10 }), true);

    expect(await productPriceService.exists(createCriteria(productPrices.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no product price match provided criteria', async () => {
    expect(await productPriceService.count(createCriteria())).toBe(0);
  });

  test('should return the count of product price match provided criteria', async () => {
    const productPrices = await createProductPrices(chance.integer({ min: 1, max: 10 }), true);

    expect(await productPriceService.count(createCriteria(productPrices.first()))).toBe(productPrices.count());
  });
});
