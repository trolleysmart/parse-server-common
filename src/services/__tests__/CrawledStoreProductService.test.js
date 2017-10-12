// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { CrawledStoreProductService } from '../';
import { createCrawledStoreProductInfo, expectCrawledStoreProduct } from '../../schema/__tests__/CrawledStoreProduct.test';

const chance = new Chance();
const crawledStoreProductService = new CrawledStoreProductService();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('name', 'description', 'barcode', 'productPageUrl', 'imageUrl', 'size', 'lastCrawlDateTime', 'store', 'storeTags'),
    include_store: true,
    include_storeTags: true,
  });

const createCriteria = crawledStoreProduct =>
  Map({
    conditions: Map({
      name: crawledStoreProduct ? crawledStoreProduct.get('name') : uuid(),
      description: crawledStoreProduct ? crawledStoreProduct.get('description') : uuid(),
      barcode: crawledStoreProduct ? crawledStoreProduct.get('barcode') : uuid(),
      productPageUrl: crawledStoreProduct ? crawledStoreProduct.get('productPageUrl') : uuid(),
      imageUrl: crawledStoreProduct ? crawledStoreProduct.get('imageUrl') : uuid(),
      size: crawledStoreProduct ? crawledStoreProduct.get('size') : uuid(),
      lastCrawlDateTime: crawledStoreProduct ? crawledStoreProduct.get('lastCrawlDateTime') : new Date(),
      storeId: crawledStoreProduct ? crawledStoreProduct.get('storeId') : uuid(),
      storeTagIds: crawledStoreProduct ? crawledStoreProduct.get('storeTagIds') : List.of(uuid(), uuid()),
    }),
  }).merge(createCriteriaWthoutConditions());

const createCrawledStoreProducts = async (count, useSameInfo = false) => {
  let crawledStoreProduct;

  if (useSameInfo) {
    const { crawledStoreProduct: tempCrawledStoreProduct } = await createCrawledStoreProductInfo();

    crawledStoreProduct = tempCrawledStoreProduct;
  }

  return Immutable.fromJS(await Promise.all(Range(0, count)
    .map(async () => {
      let finalCrawledStoreProduct;

      if (useSameInfo) {
        finalCrawledStoreProduct = crawledStoreProduct;
      } else {
        const { crawledStoreProduct: tempCrawledStoreProduct } = await createCrawledStoreProductInfo();

        finalCrawledStoreProduct = tempCrawledStoreProduct;
      }

      return crawledStoreProductService.read(await crawledStoreProductService.create(finalCrawledStoreProduct), createCriteriaWthoutConditions());
    })
    .toArray()));
};

export default createCrawledStoreProducts;

describe('create', () => {
  test('should return the created store product Id', async () => {
    const crawledStoreProductId = await crawledStoreProductService.create((await createCrawledStoreProductInfo()).crawledStoreProduct);

    expect(crawledStoreProductId).toBeDefined();
  });

  test('should create the store product', async () => {
    const { crawledStoreProduct } = await createCrawledStoreProductInfo();
    const crawledStoreProductId = await crawledStoreProductService.create(crawledStoreProduct);
    const fetchedCrawledStoreProduct = await crawledStoreProductService.read(crawledStoreProductId, createCriteriaWthoutConditions());

    expect(fetchedCrawledStoreProduct).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided store product Id does not exist', async () => {
    const crawledStoreProductId = uuid();

    try {
      await crawledStoreProductService.read(crawledStoreProductId);
    } catch (ex) {
      expect(ex.message).toBe(`No store product found with Id: ${crawledStoreProductId}`);
    }
  });

  test('should read the existing store product', async () => {
    const {
      crawledStoreProduct: expectedCrawledStoreProduct,
      store: expectedStore,
      storeTags: expectedStoreTags,
    } = await createCrawledStoreProductInfo();
    const crawledStoreProductId = await crawledStoreProductService.create(expectedCrawledStoreProduct);
    const crawledStoreProduct = await crawledStoreProductService.read(crawledStoreProductId, createCriteriaWthoutConditions());

    expectCrawledStoreProduct(crawledStoreProduct, expectedCrawledStoreProduct, { crawledStoreProductId, expectedStore, expectedStoreTags });
  });
});

describe('update', () => {
  test('should reject if the provided store product Id does not exist', async () => {
    const crawledStoreProductId = uuid();

    try {
      const crawledStoreProduct = await crawledStoreProductService.read(
        await crawledStoreProductService.create((await createCrawledStoreProductInfo()).crawledStoreProduct),
        createCriteriaWthoutConditions(),
      );

      await crawledStoreProductService.update(crawledStoreProduct.set('id', crawledStoreProductId));
    } catch (ex) {
      expect(ex.message).toBe(`No store product found with Id: ${crawledStoreProductId}`);
    }
  });

  test('should return the Id of the updated store product', async () => {
    const { crawledStoreProduct: expectedCrawledStoreProduct } = await createCrawledStoreProductInfo();
    const crawledStoreProductId = await crawledStoreProductService.create((await createCrawledStoreProductInfo()).crawledStoreProduct);
    const id = await crawledStoreProductService.update(expectedCrawledStoreProduct.set('id', crawledStoreProductId));

    expect(id).toBe(crawledStoreProductId);
  });

  test('should update the existing store product', async () => {
    const {
      crawledStoreProduct: expectedCrawledStoreProduct,
      store: expectedStore,
      storeTags: expectedStoreTags,
    } = await createCrawledStoreProductInfo();
    const crawledStoreProductId = await crawledStoreProductService.create((await createCrawledStoreProductInfo()).crawledStoreProduct);

    await crawledStoreProductService.update(expectedCrawledStoreProduct.set('id', crawledStoreProductId));

    const crawledStoreProduct = await crawledStoreProductService.read(crawledStoreProductId, createCriteriaWthoutConditions());

    expectCrawledStoreProduct(crawledStoreProduct, expectedCrawledStoreProduct, { crawledStoreProductId, expectedStore, expectedStoreTags });
  });
});

describe('delete', () => {
  test('should reject if the provided store product Id does not exist', async () => {
    const crawledStoreProductId = uuid();

    try {
      await crawledStoreProductService.delete(crawledStoreProductId);
    } catch (ex) {
      expect(ex.message).toBe(`No store product found with Id: ${crawledStoreProductId}`);
    }
  });

  test('should delete the existing store product', async () => {
    const crawledStoreProductId = await crawledStoreProductService.create((await createCrawledStoreProductInfo()).crawledStoreProduct);
    await crawledStoreProductService.delete(crawledStoreProductId);

    try {
      await crawledStoreProductService.delete(crawledStoreProductId);
    } catch (ex) {
      expect(ex.message).toBe(`No store product found with Id: ${crawledStoreProductId}`);
    }
  });
});

describe('search', () => {
  test('should return no store product if provided criteria matches no store product', async () => {
    const crawledStoreProducts = await crawledStoreProductService.search(createCriteria());

    expect(crawledStoreProducts.count()).toBe(0);
  });

  test('should return the store product matches the criteria', async () => {
    const {
      crawledStoreProduct: expectedCrawledStoreProduct,
      store: expectedStore,
      storeTags: expectedStoreTags,
    } = await createCrawledStoreProductInfo();
    const results = Immutable.fromJS(await Promise.all(Range(0, chance.integer({ min: 1, max: 10 }))
      .map(async () => crawledStoreProductService.create(expectedCrawledStoreProduct))
      .toArray()));
    const crawledStoreProducts = await crawledStoreProductService.search(createCriteria(expectedCrawledStoreProduct));

    expect(crawledStoreProducts.count).toBe(results.count);
    crawledStoreProducts.forEach((crawledStoreProduct) => {
      expect(results.find(_ => _.localeCompare(crawledStoreProduct.get('id')) === 0)).toBeDefined();
      expectCrawledStoreProduct(crawledStoreProduct, expectedCrawledStoreProduct, {
        crawledStoreProductId: crawledStoreProduct.get('id'),
        expectedStore,
        expectedStoreTags,
      });
    });
  });
});

describe('searchAll', () => {
  test('should return no store product if provided criteria matches no store product', async () => {
    let crawledStoreProducts = List();
    const result = crawledStoreProductService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        crawledStoreProducts = crawledStoreProducts.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(crawledStoreProducts.count()).toBe(0);
  });

  test('should return the store product matches the criteria', async () => {
    const {
      crawledStoreProduct: expectedCrawledStoreProduct,
      store: expectedStore,
      storeTags: expectedStoreTags,
    } = await createCrawledStoreProductInfo();
    const results = Immutable.fromJS(await Promise.all(Range(0, chance.integer({ min: 2, max: 5 }))
      .map(async () => crawledStoreProductService.create(expectedCrawledStoreProduct))
      .toArray()));

    let crawledStoreProducts = List();
    const result = crawledStoreProductService.searchAll(createCriteria(expectedCrawledStoreProduct));

    try {
      result.event.subscribe((info) => {
        crawledStoreProducts = crawledStoreProducts.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(crawledStoreProducts.count).toBe(results.count);
    crawledStoreProducts.forEach((crawledStoreProduct) => {
      expect(results.find(_ => _.localeCompare(crawledStoreProduct.get('id')) === 0)).toBeDefined();
      expectCrawledStoreProduct(crawledStoreProduct, expectedCrawledStoreProduct, {
        crawledStoreProductId: crawledStoreProduct.get('id'),
        expectedStore,
        expectedStoreTags,
      });
    });
  });
});

describe('exists', () => {
  test('should return false if no store product match provided criteria', async () => {
    expect(await crawledStoreProductService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any store product match provided criteria', async () => {
    const crawledStoreProducts = await createCrawledStoreProducts(chance.integer({ min: 1, max: 10 }), true);

    expect(await crawledStoreProductService.exists(createCriteria(crawledStoreProducts.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no store product match provided criteria', async () => {
    expect(await crawledStoreProductService.count(createCriteria())).toBe(0);
  });

  test('should return the count of store product match provided criteria', async () => {
    const crawledStoreProducts = await createCrawledStoreProducts(chance.integer({ min: 1, max: 10 }), true);

    expect(await crawledStoreProductService.count(createCriteria(crawledStoreProducts.first()))).toBe(crawledStoreProducts.count());
  });
});
