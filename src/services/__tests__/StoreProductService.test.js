// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StoreProductService } from '../';
import { createStoreProductInfo, expectStoreProduct } from '../../schema/__tests__/StoreProduct.test';

const chance = new Chance();
const storeProductService = new StoreProductService();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of(
      'name',
      'description',
      'barcode',
      'productPageUrl',
      'imageUrl',
      'size',
      'lastCrawlDateTime',
      'store',
      'storeTags',
      'createdByCrawler',
    ),
    include_store: true,
    include_storeTags: true,
  });

const createCriteria = storeProduct =>
  Map({
    conditions: Map({
      name: storeProduct ? storeProduct.get('name') : uuid(),
      description: storeProduct ? storeProduct.get('description') : uuid(),
      barcode: storeProduct ? storeProduct.get('barcode') : uuid(),
      productPageUrl: storeProduct ? storeProduct.get('productPageUrl') : uuid(),
      imageUrl: storeProduct ? storeProduct.get('imageUrl') : uuid(),
      size: storeProduct ? storeProduct.get('size') : uuid(),
      lastCrawlDateTime: storeProduct ? storeProduct.get('lastCrawlDateTime') : new Date(),
      storeId: storeProduct ? storeProduct.get('storeId') : uuid(),
      storeTagIds: storeProduct ? storeProduct.get('storeTagIds') : List.of(uuid(), uuid()),
      createdByCrawler: storeProduct ? storeProduct.get('createdByCrawler') : chance.integer({ min: 1, max: 1000 }) % 2 === 0,
    }),
  }).merge(createCriteriaWthoutConditions());

const createStoreProducts = async (count, useSameInfo = false) => {
  let storeProduct;

  if (useSameInfo) {
    const { storeProduct: tempStoreProduct } = await createStoreProductInfo();

    storeProduct = tempStoreProduct;
  }

  return Immutable.fromJS(await Promise.all(Range(0, count)
    .map(async () => {
      let finalStoreProduct;

      if (useSameInfo) {
        finalStoreProduct = storeProduct;
      } else {
        const { storeProduct: tempStoreProduct } = await createStoreProductInfo();

        finalStoreProduct = tempStoreProduct;
      }

      return storeProductService.read(await storeProductService.create(finalStoreProduct), createCriteriaWthoutConditions());
    })
    .toArray()));
};

export default createStoreProducts;

describe('create', () => {
  test('should return the created store product Id', async () => {
    const storeProductId = await storeProductService.create((await createStoreProductInfo()).storeProduct);

    expect(storeProductId).toBeDefined();
  });

  test('should create the store product', async () => {
    const { storeProduct } = await createStoreProductInfo();
    const storeProductId = await storeProductService.create(storeProduct);
    const fetchedStoreProduct = await storeProductService.read(storeProductId, createCriteriaWthoutConditions());

    expect(fetchedStoreProduct).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided store product Id does not exist', async () => {
    const storeProductId = uuid();

    try {
      await storeProductService.read(storeProductId);
    } catch (ex) {
      expect(ex.message).toBe(`No store product found with Id: ${storeProductId}`);
    }
  });

  test('should read the existing store product', async () => {
    const { storeProduct: expectedStoreProduct, store: expectedStore, storeTags: expectedStoreTags } = await createStoreProductInfo();
    const storeProductId = await storeProductService.create(expectedStoreProduct);
    const storeProduct = await storeProductService.read(storeProductId, createCriteriaWthoutConditions());

    expectStoreProduct(storeProduct, expectedStoreProduct, { storeProductId, expectedStore, expectedStoreTags });
  });
});

describe('update', () => {
  test('should reject if the provided store product Id does not exist', async () => {
    const storeProductId = uuid();

    try {
      const storeProduct = await storeProductService.read(
        await storeProductService.create((await createStoreProductInfo()).storeProduct),
        createCriteriaWthoutConditions(),
      );

      await storeProductService.update(storeProduct.set('id', storeProductId));
    } catch (ex) {
      expect(ex.message).toBe(`No store product found with Id: ${storeProductId}`);
    }
  });

  test('should return the Id of the updated store product', async () => {
    const { storeProduct: expectedStoreProduct } = await createStoreProductInfo();
    const storeProductId = await storeProductService.create((await createStoreProductInfo()).storeProduct);
    const id = await storeProductService.update(expectedStoreProduct.set('id', storeProductId));

    expect(id).toBe(storeProductId);
  });

  test('should update the existing store product', async () => {
    const { storeProduct: expectedStoreProduct, store: expectedStore, storeTags: expectedStoreTags } = await createStoreProductInfo();
    const storeProductId = await storeProductService.create((await createStoreProductInfo()).storeProduct);

    await storeProductService.update(expectedStoreProduct.set('id', storeProductId));

    const storeProduct = await storeProductService.read(storeProductId, createCriteriaWthoutConditions());

    expectStoreProduct(storeProduct, expectedStoreProduct, { storeProductId, expectedStore, expectedStoreTags });
  });
});

describe('delete', () => {
  test('should reject if the provided store product Id does not exist', async () => {
    const storeProductId = uuid();

    try {
      await storeProductService.delete(storeProductId);
    } catch (ex) {
      expect(ex.message).toBe(`No store product found with Id: ${storeProductId}`);
    }
  });

  test('should delete the existing store product', async () => {
    const storeProductId = await storeProductService.create((await createStoreProductInfo()).storeProduct);
    await storeProductService.delete(storeProductId);

    try {
      await storeProductService.delete(storeProductId);
    } catch (ex) {
      expect(ex.message).toBe(`No store product found with Id: ${storeProductId}`);
    }
  });
});

describe('search', () => {
  test('should return no store product if provided criteria matches no store product', async () => {
    const storeProducts = await storeProductService.search(createCriteria());

    expect(storeProducts.count()).toBe(0);
  });

  test('should return the store product matches the criteria', async () => {
    const { storeProduct: expectedStoreProduct, store: expectedStore, storeTags: expectedStoreTags } = await createStoreProductInfo();
    const results = Immutable.fromJS(await Promise.all(Range(0, chance.integer({ min: 1, max: 10 }))
      .map(async () => storeProductService.create(expectedStoreProduct))
      .toArray()));
    const storeProducts = await storeProductService.search(createCriteria(expectedStoreProduct));

    expect(storeProducts.count).toBe(results.count);
    storeProducts.forEach((storeProduct) => {
      expect(results.find(_ => _.localeCompare(storeProduct.get('id')) === 0)).toBeDefined();
      expectStoreProduct(storeProduct, expectedStoreProduct, { storeProductId: storeProduct.get('id'), expectedStore, expectedStoreTags });
    });
  });
});

describe('searchAll', () => {
  test('should return no store product if provided criteria matches no store product', async () => {
    let storeProducts = List();
    const result = storeProductService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        storeProducts = storeProducts.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(storeProducts.count()).toBe(0);
  });

  test('should return the store product matches the criteria', async () => {
    const { storeProduct: expectedStoreProduct, store: expectedStore, storeTags: expectedStoreTags } = await createStoreProductInfo();
    const results = Immutable.fromJS(await Promise.all(Range(0, chance.integer({ min: 2, max: 5 }))
      .map(async () => storeProductService.create(expectedStoreProduct))
      .toArray()));

    let storeProducts = List();
    const result = storeProductService.searchAll(createCriteria(expectedStoreProduct));

    try {
      result.event.subscribe((info) => {
        storeProducts = storeProducts.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(storeProducts.count).toBe(results.count);
    storeProducts.forEach((storeProduct) => {
      expect(results.find(_ => _.localeCompare(storeProduct.get('id')) === 0)).toBeDefined();
      expectStoreProduct(storeProduct, expectedStoreProduct, { storeProductId: storeProduct.get('id'), expectedStore, expectedStoreTags });
    });
  });
});

describe('exists', () => {
  test('should return false if no store product match provided criteria', async () => {
    expect(await storeProductService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any store product match provided criteria', async () => {
    const storeProducts = await createStoreProducts(chance.integer({ min: 1, max: 10 }), true);

    expect(await storeProductService.exists(createCriteria(storeProducts.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no store product match provided criteria', async () => {
    expect(await storeProductService.count(createCriteria())).toBe(0);
  });

  test('should return the count of store product match provided criteria', async () => {
    const storeProducts = await createStoreProducts(chance.integer({ min: 1, max: 10 }), true);

    expect(await storeProductService.count(createCriteria(storeProducts.first()))).toBe(storeProducts.count());
  });
});
