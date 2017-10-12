// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { CrawledProductPriceService } from '../';
import { createCrawledProductPriceInfo, expectCrawledProductPrice } from '../../schema/__tests__/CrawledProductPrice.test';

const chance = new Chance();
const crawledProductPriceService = new CrawledProductPriceService();

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
      'barcode',
      'size',
      'imageUrl',
      'productPageUrl',
      'store',
      'tags',
      'crawledStoreProduct',
    ),
    include_store: true,
    include_tags: true,
    include_crawledStoreProduct: true,
  });

const createCriteria = crawledProductPrice =>
  Map({
    conditions: Map({
      name: crawledProductPrice ? crawledProductPrice.get('name') : uuid(),
      description: crawledProductPrice ? crawledProductPrice.get('description') : uuid(),
      priceDetails: crawledProductPrice ? crawledProductPrice.get('priceDetails') : Map({ price: chance.floating({ min: 0, max: 1000 }) }),
      priceToDisplay: crawledProductPrice ? crawledProductPrice.get('priceToDisplay') : chance.floating({ min: 0, max: 1000 }),
      saving: crawledProductPrice ? crawledProductPrice.get('saving') : chance.floating({ min: 0, max: 1000 }),
      savingPercentage: crawledProductPrice ? crawledProductPrice.get('savingPercentage') : chance.floating({ min: 0, max: 100 }),
      offerEndDate: crawledProductPrice ? crawledProductPrice.get('offerEndDate') : new Date(),
      status: crawledProductPrice ? crawledProductPrice.get('status') : uuid(),
      special: crawledProductPrice ? crawledProductPrice.get('special') : chance.integer({ min: 0, max: 1000 }) % 2 === 0,
      barcode: crawledProductPrice ? crawledProductPrice.get('barcode') : uuid(),
      size: crawledProductPrice ? crawledProductPrice.get('size') : uuid(),
      imageUrl: crawledProductPrice ? crawledProductPrice.get('imageUrl') : uuid(),
      productPageUrl: crawledProductPrice ? crawledProductPrice.get('productPageUrl') : uuid(),
      storeId: crawledProductPrice ? crawledProductPrice.get('storeId') : uuid(),
      tagIds: crawledProductPrice ? crawledProductPrice.get('tagIds') : List.of(uuid(), uuid()),
      crawledStoreProductId: crawledProductPrice ? crawledProductPrice.get('crawledStoreProductId') : uuid(),
    }),
  }).merge(createCriteriaWthoutConditions());

const createCrawledProductPrices = async (count, useSameInfo = false) => {
  let crawledProductPrice;

  if (useSameInfo) {
    const { crawledProductPrice: tempCrawledProductPrice } = await createCrawledProductPriceInfo();

    crawledProductPrice = tempCrawledProductPrice;
  }

  return Immutable.fromJS(await Promise.all(Range(0, count)
    .map(async () => {
      let finalCrawledProductPrice;

      if (useSameInfo) {
        finalCrawledProductPrice = crawledProductPrice;
      } else {
        const { crawledProductPrice: tempCrawledProductPrice } = await createCrawledProductPriceInfo();

        finalCrawledProductPrice = tempCrawledProductPrice;
      }

      return crawledProductPriceService.read(await crawledProductPriceService.create(finalCrawledProductPrice), createCriteriaWthoutConditions());
    })
    .toArray()));
};

export default createCrawledProductPrices;

describe('create', () => {
  test('should return the created product price Id', async () => {
    const crawledProductPriceId = await crawledProductPriceService.create((await createCrawledProductPriceInfo()).crawledProductPrice);

    expect(crawledProductPriceId).toBeDefined();
  });

  test('should create the product price', async () => {
    const { crawledProductPrice } = await createCrawledProductPriceInfo();
    const crawledProductPriceId = await crawledProductPriceService.create(crawledProductPrice);
    const fetchedCrawledProductPrice = await crawledProductPriceService.read(crawledProductPriceId, createCriteriaWthoutConditions());

    expect(fetchedCrawledProductPrice).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided product price Id does not exist', async () => {
    const crawledProductPriceId = uuid();

    try {
      await crawledProductPriceService.read(crawledProductPriceId);
    } catch (ex) {
      expect(ex.message).toBe(`No product price found with Id: ${crawledProductPriceId}`);
    }
  });

  test('should read the existing product price', async () => {
    const {
      crawledProductPrice: expectedCrawledProductPrice,
      store: expectedStore,
      tags: expectedTags,
      crawledStoreProduct: expectedCrawledStoreProduct,
    } = await createCrawledProductPriceInfo();
    const crawledProductPriceId = await crawledProductPriceService.create(expectedCrawledProductPrice);
    const crawledProductPrice = await crawledProductPriceService.read(crawledProductPriceId, createCriteriaWthoutConditions());

    expectCrawledProductPrice(crawledProductPrice, expectedCrawledProductPrice, {
      crawledProductPriceId,
      expectedStore,
      expectedTags,
      expectedCrawledStoreProduct,
    });
  });
});

describe('update', () => {
  test('should reject if the provided product price Id does not exist', async () => {
    const crawledProductPriceId = uuid();

    try {
      const crawledProductPrice = await crawledProductPriceService.read(
        await crawledProductPriceService.create((await createCrawledProductPriceInfo()).crawledProductPrice),
        createCriteriaWthoutConditions(),
      );

      await crawledProductPriceService.update(crawledProductPrice.set('id', crawledProductPriceId));
    } catch (ex) {
      expect(ex.message).toBe(`No product price found with Id: ${crawledProductPriceId}`);
    }
  });

  test('should return the Id of the updated product price', async () => {
    const { crawledProductPrice: expectedCrawledProductPrice } = await createCrawledProductPriceInfo();
    const crawledProductPriceId = await crawledProductPriceService.create((await createCrawledProductPriceInfo()).crawledProductPrice);
    const id = await crawledProductPriceService.update(expectedCrawledProductPrice.set('id', crawledProductPriceId));

    expect(id).toBe(crawledProductPriceId);
  });

  test('should update the existing product price', async () => {
    const {
      crawledProductPrice: expectedCrawledProductPrice,
      store: expectedStore,
      tags: expectedTags,
      crawledStoreProduct: expectedCrawledStoreProduct,
    } = await createCrawledProductPriceInfo();
    const crawledProductPriceId = await crawledProductPriceService.create((await createCrawledProductPriceInfo()).crawledProductPrice);

    await crawledProductPriceService.update(expectedCrawledProductPrice.set('id', crawledProductPriceId));

    const crawledProductPrice = await crawledProductPriceService.read(crawledProductPriceId, createCriteriaWthoutConditions());

    expectCrawledProductPrice(crawledProductPrice, expectedCrawledProductPrice, {
      crawledProductPriceId,
      expectedStore,
      expectedTags,
      expectedCrawledStoreProduct,
    });
  });
});

describe('delete', () => {
  test('should reject if the provided product price Id does not exist', async () => {
    const crawledProductPriceId = uuid();

    try {
      await crawledProductPriceService.delete(crawledProductPriceId);
    } catch (ex) {
      expect(ex.message).toBe(`No product price found with Id: ${crawledProductPriceId}`);
    }
  });

  test('should delete the existing product price', async () => {
    const crawledProductPriceId = await crawledProductPriceService.create((await createCrawledProductPriceInfo()).crawledProductPrice);
    await crawledProductPriceService.delete(crawledProductPriceId);

    try {
      await crawledProductPriceService.delete(crawledProductPriceId);
    } catch (ex) {
      expect(ex.message).toBe(`No product price found with Id: ${crawledProductPriceId}`);
    }
  });
});

describe('search', () => {
  test('should return no product price if provided criteria matches no product price', async () => {
    const crawledProductPrices = await crawledProductPriceService.search(createCriteria());

    expect(crawledProductPrices.count()).toBe(0);
  });

  test('should return the product price matches the criteria', async () => {
    const {
      crawledProductPrice: expectedCrawledProductPrice,
      store: expectedStore,
      tags: expectedTags,
      crawledStoreProduct: expectedCrawledStoreProduct,
    } = await createCrawledProductPriceInfo();
    const results = Immutable.fromJS(await Promise.all(Range(0, chance.integer({ min: 2, max: 5 }))
      .map(async () => crawledProductPriceService.create(expectedCrawledProductPrice))
      .toArray()));
    const crawledProductPrices = await crawledProductPriceService.search(createCriteria(expectedCrawledProductPrice));

    expect(crawledProductPrices.count).toBe(results.count);
    crawledProductPrices.forEach((crawledProductPrice) => {
      expect(results.find(_ => _.localeCompare(crawledProductPrice.get('id')) === 0)).toBeDefined();
      expectCrawledProductPrice(crawledProductPrice, expectedCrawledProductPrice, {
        crawledProductPriceId: crawledProductPrice.get('id'),
        expectedStore,
        expectedTags,
        expectedCrawledStoreProduct,
      });
    });
  });
});

describe('searchAll', () => {
  test('should return no product price if provided criteria matches no product price', async () => {
    let crawledProductPrices = List();
    const result = crawledProductPriceService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        crawledProductPrices = crawledProductPrices.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(crawledProductPrices.count()).toBe(0);
  });

  test('should return the product price matches the criteria', async () => {
    const {
      crawledProductPrice: expectedCrawledProductPrice,
      store: expectedStore,
      tags: expectedTags,
      crawledStoreProduct: expectedCrawledStoreProduct,
    } = await createCrawledProductPriceInfo();
    const results = Immutable.fromJS(await Promise.all(Range(0, chance.integer({ min: 2, max: 5 }))
      .map(async () => crawledProductPriceService.create(expectedCrawledProductPrice))
      .toArray()));

    let crawledProductPrices = List();
    const result = crawledProductPriceService.searchAll(createCriteria(expectedCrawledProductPrice));

    try {
      result.event.subscribe((info) => {
        crawledProductPrices = crawledProductPrices.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(crawledProductPrices.count).toBe(results.count);
    crawledProductPrices.forEach((crawledProductPrice) => {
      expect(results.find(_ => _.localeCompare(crawledProductPrice.get('id')) === 0)).toBeDefined();
      expectCrawledProductPrice(crawledProductPrice, expectedCrawledProductPrice, {
        crawledProductPriceId: crawledProductPrice.get('id'),
        expectedStore,
        expectedTags,
        expectedCrawledStoreProduct,
      });
    });
  });
});

describe('exists', () => {
  test('should return false if no product price match provided criteria', async () => {
    expect(await crawledProductPriceService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any product price match provided criteria', async () => {
    const crawledProductPrices = await createCrawledProductPrices(chance.integer({ min: 1, max: 10 }), true);

    expect(await crawledProductPriceService.exists(createCriteria(crawledProductPrices.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no product price match provided criteria', async () => {
    expect(await crawledProductPriceService.count(createCriteria())).toBe(0);
  });

  test('should return the count of product price match provided criteria', async () => {
    const crawledProductPrices = await createCrawledProductPrices(chance.integer({ min: 1, max: 10 }), true);

    expect(await crawledProductPriceService.count(createCriteria(crawledProductPrices.first()))).toBe(crawledProductPrices.count());
  });
});
