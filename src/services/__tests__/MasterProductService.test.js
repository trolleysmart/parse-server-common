// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { MasterProductService } from '../';
import { createMasterProductInfo, expectMasterProduct } from '../../schema/__tests__/MasterProduct.test';

const chance = new Chance();
const masterProductService = new MasterProductService();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('name', 'description', 'barcode', 'imageUrl', 'size', 'tags'),
    include_store: true,
    include_storeTags: true,
    include_tags: true,
  });

const createCriteria = masterProduct =>
  Map({
    conditions: Map({
      name: masterProduct ? masterProduct.get('name') : uuid(),
      description: masterProduct ? masterProduct.get('description') : uuid(),
      barcode: masterProduct ? masterProduct.get('barcode') : uuid(),
      imageUrl: masterProduct ? masterProduct.get('imageUrl') : uuid(),
      size: masterProduct ? masterProduct.get('size') : uuid(),
      tagIds: masterProduct ? masterProduct.get('tagIds') : List.of(uuid(), uuid()),
    }),
  }).merge(createCriteriaWthoutConditions());

const createMasterProducts = async (count, useSameInfo = false) => {
  let masterProduct;

  if (useSameInfo) {
    const { masterProduct: tempMasterProduct } = await createMasterProductInfo();

    masterProduct = tempMasterProduct;
  }

  return Immutable.fromJS(await Promise.all(Range(0, count)
    .map(async () => {
      let finalMasterProduct;

      if (useSameInfo) {
        finalMasterProduct = masterProduct;
      } else {
        const { masterProduct: tempMasterProduct } = await createMasterProductInfo();

        finalMasterProduct = tempMasterProduct;
      }

      return masterProductService.read(await masterProductService.create(finalMasterProduct), createCriteriaWthoutConditions());
    })
    .toArray()));
};

export default createMasterProducts;

describe('create', () => {
  test('should return the created master product Id', async () => {
    const masterProductId = await masterProductService.create((await createMasterProductInfo()).masterProduct);

    expect(masterProductId).toBeDefined();
  });

  test('should create the master product', async () => {
    const { masterProduct } = await createMasterProductInfo();
    const masterProductId = await masterProductService.create(masterProduct);
    const fetchedMasterProduct = await masterProductService.read(masterProductId, createCriteriaWthoutConditions());

    expect(fetchedMasterProduct).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided master product Id does not exist', async () => {
    const masterProductId = uuid();

    try {
      await masterProductService.read(masterProductId);
    } catch (ex) {
      expect(ex.message).toBe(`No master product found with Id: ${masterProductId}`);
    }
  });

  test('should read the existing master product', async () => {
    const { masterProduct: expectedMasterProduct, tags: expectedTags } = await createMasterProductInfo();
    const masterProductId = await masterProductService.create(expectedMasterProduct);
    const masterProduct = await masterProductService.read(masterProductId, createCriteriaWthoutConditions());

    expectMasterProduct(masterProduct, expectedMasterProduct, {
      masterProductId,
      expectedTags,
    });
  });
});

describe('update', () => {
  test('should reject if the provided master product Id does not exist', async () => {
    const masterProductId = uuid();

    try {
      const masterProduct = await masterProductService.read(
        await masterProductService.create((await createMasterProductInfo()).masterProduct),
        createCriteriaWthoutConditions(),
      );

      await masterProductService.update(masterProduct.set('id', masterProductId));
    } catch (ex) {
      expect(ex.message).toBe(`No master product found with Id: ${masterProductId}`);
    }
  });

  test('should return the Id of the updated master product', async () => {
    const { masterProduct: expectedMasterProduct } = await createMasterProductInfo();
    const masterProductId = await masterProductService.create((await createMasterProductInfo()).masterProduct);
    const id = await masterProductService.update(expectedMasterProduct.set('id', masterProductId));

    expect(id).toBe(masterProductId);
  });

  test('should update the existing master product', async () => {
    const { masterProduct: expectedMasterProduct, tags: expectedTags } = await createMasterProductInfo();
    const masterProductId = await masterProductService.create((await createMasterProductInfo()).masterProduct);

    await masterProductService.update(expectedMasterProduct.set('id', masterProductId));

    const masterProduct = await masterProductService.read(masterProductId, createCriteriaWthoutConditions());

    expectMasterProduct(masterProduct, expectedMasterProduct, {
      masterProductId,
      expectedTags,
    });
  });
});

describe('delete', () => {
  test('should reject if the provided master product Id does not exist', async () => {
    const masterProductId = uuid();

    try {
      await masterProductService.delete(masterProductId);
    } catch (ex) {
      expect(ex.message).toBe(`No master product found with Id: ${masterProductId}`);
    }
  });

  test('should delete the existing master product', async () => {
    const masterProductId = await masterProductService.create((await createMasterProductInfo()).masterProduct);
    await masterProductService.delete(masterProductId);

    try {
      await masterProductService.delete(masterProductId);
    } catch (ex) {
      expect(ex.message).toBe(`No master product found with Id: ${masterProductId}`);
    }
  });
});

describe('search', () => {
  test('should return no master product if provided criteria matches no master product', async () => {
    const masterProducts = await masterProductService.search(createCriteria());

    expect(masterProducts.count()).toBe(0);
  });

  test('should return the master product matches the criteria', async () => {
    const { masterProduct: expectedMasterProduct, tags: expectedTags } = await createMasterProductInfo();
    const results = Immutable.fromJS(await Promise.all(Range(0, chance.integer({ min: 1, max: 10 }))
      .map(async () => masterProductService.create(expectedMasterProduct))
      .toArray()));
    const masterProducts = await masterProductService.search(createCriteria(expectedMasterProduct));

    expect(masterProducts.count).toBe(results.count);
    masterProducts.forEach((masterProduct) => {
      expect(results.find(_ => _.localeCompare(masterProduct.get('id')) === 0)).toBeDefined();
      expectMasterProduct(masterProduct, expectedMasterProduct, {
        masterProductId: masterProduct.get('id'),
        expectedTags,
      });
    });
  });
});

describe('searchAll', () => {
  test('should return no master product if provided criteria matches no master product', async () => {
    let masterProducts = List();
    const result = masterProductService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        masterProducts = masterProducts.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(masterProducts.count()).toBe(0);
  });

  test('should return the master product matches the criteria', async () => {
    const { masterProduct: expectedMasterProduct, tags: expectedTags } = await createMasterProductInfo();
    const results = Immutable.fromJS(await Promise.all(Range(0, chance.integer({ min: 2, max: 5 }))
      .map(async () => masterProductService.create(expectedMasterProduct))
      .toArray()));

    let masterProducts = List();
    const result = masterProductService.searchAll(createCriteria(expectedMasterProduct));

    try {
      result.event.subscribe((info) => {
        masterProducts = masterProducts.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(masterProducts.count).toBe(results.count);
    masterProducts.forEach((masterProduct) => {
      expect(results.find(_ => _.localeCompare(masterProduct.get('id')) === 0)).toBeDefined();
      expectMasterProduct(masterProduct, expectedMasterProduct, {
        masterProductId: masterProduct.get('id'),
        expectedTags,
      });
    });
  });
});

describe('exists', () => {
  test('should return false if no master product match provided criteria', async () => {
    expect(await masterProductService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any master product match provided criteria', async () => {
    const masterProducts = await createMasterProducts(chance.integer({ min: 1, max: 10 }), true);

    expect(await masterProductService.exists(createCriteria(masterProducts.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no master product match provided criteria', async () => {
    expect(await masterProductService.count(createCriteria())).toBe(0);
  });

  test('should return the count of master product match provided criteria', async () => {
    const masterProducts = await createMasterProducts(chance.integer({ min: 1, max: 10 }), true);

    expect(await masterProductService.count(createCriteria(masterProducts.first()))).toBe(masterProducts.count());
  });
});
