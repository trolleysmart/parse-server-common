// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { MyProductService } from '../';
import { createMyProductInfo, expectMyProduct } from '../../schema/__tests__/MyProduct.test';

const chance = new Chance();
const myProductService = new MyProductService();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('name', 'description', 'barcode', 'productPageUrl', 'imageUrl', 'size', 'tags', 'ownedByUser'),
    include_tags: true,
    include_ownedByUser: true,
  });

const createCriteria = myProduct =>
  Map({
    conditions: Map({
      name: myProduct ? myProduct.get('name') : uuid(),
      description: myProduct ? myProduct.get('description') : uuid(),
      barcode: myProduct ? myProduct.get('barcode') : uuid(),
      productPageUrl: myProduct ? myProduct.get('productPageUrl') : uuid(),
      imageUrl: myProduct ? myProduct.get('imageUrl') : uuid(),
      size: myProduct ? myProduct.get('size') : uuid(),
      tagIds: myProduct ? myProduct.get('tagIds') : List.of(uuid(), uuid()),
      ownedByUserId: myProduct ? myProduct.get('ownedByUserId') : uuid(),
    }),
  }).merge(createCriteriaWthoutConditions());

const createMyProducts = async (count, useSameInfo = false) => {
  let myProduct;

  if (useSameInfo) {
    const { myProduct: tempMyProduct } = await createMyProductInfo();

    myProduct = tempMyProduct;
  }

  return Immutable.fromJS(await Promise.all(Range(0, count)
    .map(async () => {
      let finalMyProduct;

      if (useSameInfo) {
        finalMyProduct = myProduct;
      } else {
        const { myProduct: tempMyProduct } = await createMyProductInfo();

        finalMyProduct = tempMyProduct;
      }

      return myProductService.read(await myProductService.create(finalMyProduct), createCriteriaWthoutConditions());
    })
    .toArray()));
};

export default createMyProducts;

describe('create', () => {
  test('should return the created my product Id', async () => {
    const myProductId = await myProductService.create((await createMyProductInfo()).myProduct);

    expect(myProductId).toBeDefined();
  });

  test('should create the my product', async () => {
    const { myProduct } = await createMyProductInfo();
    const myProductId = await myProductService.create(myProduct);
    const fetchedMyProduct = await myProductService.read(myProductId, createCriteriaWthoutConditions());

    expect(fetchedMyProduct).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided my product Id does not exist', async () => {
    const myProductId = uuid();

    try {
      await myProductService.read(myProductId);
    } catch (ex) {
      expect(ex.message).toBe(`No my product found with Id: ${myProductId}`);
    }
  });

  test('should read the existing my product', async () => {
    const {
      myProduct: expectedMyProduct, store: expectedStore, storeTags: expectedStoreTags, tags: expectedTags,
    } = await createMyProductInfo();
    const myProductId = await myProductService.create(expectedMyProduct);
    const myProduct = await myProductService.read(myProductId, createCriteriaWthoutConditions());

    expectMyProduct(myProduct, expectedMyProduct, {
      myProductId,
      expectedStore,
      expectedStoreTags,
      expectedTags,
    });
  });
});

describe('update', () => {
  test('should reject if the provided my product Id does not exist', async () => {
    const myProductId = uuid();

    try {
      const myProduct = await myProductService.read(
        await myProductService.create((await createMyProductInfo()).myProduct),
        createCriteriaWthoutConditions(),
      );

      await myProductService.update(myProduct.set('id', myProductId));
    } catch (ex) {
      expect(ex.message).toBe(`No my product found with Id: ${myProductId}`);
    }
  });

  test('should return the Id of the updated my product', async () => {
    const { myProduct: expectedMyProduct } = await createMyProductInfo();
    const myProductId = await myProductService.create((await createMyProductInfo()).myProduct);
    const id = await myProductService.update(expectedMyProduct.set('id', myProductId));

    expect(id).toBe(myProductId);
  });

  test('should update the existing my product', async () => {
    const {
      myProduct: expectedMyProduct, store: expectedStore, storeTags: expectedStoreTags, tags: expectedTags,
    } = await createMyProductInfo();
    const myProductId = await myProductService.create((await createMyProductInfo()).myProduct);

    await myProductService.update(expectedMyProduct.set('id', myProductId));

    const myProduct = await myProductService.read(myProductId, createCriteriaWthoutConditions());

    expectMyProduct(myProduct, expectedMyProduct, {
      myProductId,
      expectedStore,
      expectedStoreTags,
      expectedTags,
    });
  });
});

describe('delete', () => {
  test('should reject if the provided my product Id does not exist', async () => {
    const myProductId = uuid();

    try {
      await myProductService.delete(myProductId);
    } catch (ex) {
      expect(ex.message).toBe(`No my product found with Id: ${myProductId}`);
    }
  });

  test('should delete the existing my product', async () => {
    const myProductId = await myProductService.create((await createMyProductInfo()).myProduct);
    await myProductService.delete(myProductId);

    try {
      await myProductService.delete(myProductId);
    } catch (ex) {
      expect(ex.message).toBe(`No my product found with Id: ${myProductId}`);
    }
  });
});

describe('search', () => {
  test('should return no my product if provided criteria matches no my product', async () => {
    const myProducts = await myProductService.search(createCriteria());

    expect(myProducts.count()).toBe(0);
  });

  test('should return the my product matches the criteria', async () => {
    const {
      myProduct: expectedMyProduct, store: expectedStore, storeTags: expectedStoreTags, tags: expectedTags,
    } = await createMyProductInfo();
    const results = Immutable.fromJS(await Promise.all(Range(0, chance.integer({ min: 1, max: 10 }))
      .map(async () => myProductService.create(expectedMyProduct))
      .toArray()));
    const myProducts = await myProductService.search(createCriteria(expectedMyProduct));

    expect(myProducts.count).toBe(results.count);
    myProducts.forEach((myProduct) => {
      expect(results.find(_ => _.localeCompare(myProduct.get('id')) === 0)).toBeDefined();
      expectMyProduct(myProduct, expectedMyProduct, {
        myProductId: myProduct.get('id'),
        expectedStore,
        expectedStoreTags,
        expectedTags,
      });
    });
  });
});

describe('searchAll', () => {
  test('should return no my product if provided criteria matches no my product', async () => {
    let myProducts = List();
    const result = myProductService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        myProducts = myProducts.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(myProducts.count()).toBe(0);
  });

  test('should return the my product matches the criteria', async () => {
    const {
      myProduct: expectedMyProduct, store: expectedStore, storeTags: expectedStoreTags, tags: expectedTags,
    } = await createMyProductInfo();
    const results = Immutable.fromJS(await Promise.all(Range(0, chance.integer({ min: 2, max: 5 }))
      .map(async () => myProductService.create(expectedMyProduct))
      .toArray()));

    let myProducts = List();
    const result = myProductService.searchAll(createCriteria(expectedMyProduct));

    try {
      result.event.subscribe((info) => {
        myProducts = myProducts.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(myProducts.count).toBe(results.count);
    myProducts.forEach((myProduct) => {
      expect(results.find(_ => _.localeCompare(myProduct.get('id')) === 0)).toBeDefined();
      expectMyProduct(myProduct, expectedMyProduct, {
        myProductId: myProduct.get('id'),
        expectedStore,
        expectedStoreTags,
        expectedTags,
      });
    });
  });
});

describe('exists', () => {
  test('should return false if no my product match provided criteria', async () => {
    expect(await myProductService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any my product match provided criteria', async () => {
    const myProducts = await createMyProducts(chance.integer({ min: 1, max: 10 }), true);

    expect(await myProductService.exists(createCriteria(myProducts.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no my product match provided criteria', async () => {
    expect(await myProductService.count(createCriteria())).toBe(0);
  });

  test('should return the count of my product match provided criteria', async () => {
    const myProducts = await createMyProducts(chance.integer({ min: 1, max: 10 }), true);

    expect(await myProductService.count(createCriteria(myProducts.first()))).toBe(myProducts.count());
  });
});
