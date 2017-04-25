import {
  List,
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import '../bootstrap';
import {
  MasterProductService,
} from './master-product-service';
import {
  MasterProductPriceService,
} from './master-product-price-service';
import {
  StoreService,
} from './store-service';
import {
  createMasterProductInfo,
} from './schema/master-product.test';
import {
  createMasterProductPriceInfo,
} from './schema/master-product-price.test';
import {
  createStoreInfo,
} from './schema/store.test';

function expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId) {
  expect(masterProductPriceInfo.get('id'))
    .toBe(masterProductPriceId);
  expect(masterProductPriceInfo.get('masterProduct')
      .getId())
    .toBe(masterProductId);
  expect(masterProductPriceInfo.get('store')
      .getId())
    .toBe(storeId);
  expect(masterProductPriceInfo.get('priceDetails'))
    .toEqual(expectedMasterProductPriceInfo.get('priceDetails'));
  expect(masterProductPriceInfo.get('capturedDate'))
    .toEqual(expectedMasterProductPriceInfo.get('capturedDate'));
}

export function createCriteria() {
  return Map({
    masterProductId: uuid(),
    storeId: uuid(),
  });
}

export function createCriteriaUsingProvidedMasterProductPriceInfo(masterProductPriceInfo, masterProductId, storeId) {
  return Map({
    masterProductId,
    storeId,
  });
}

describe('create', () => {
  test('should return the created master product price Id', (done) => {
    Promise.all([MasterProductService.create(createMasterProductInfo()), StoreService.create(createStoreInfo())])
      .then((results) => {
        const masterProductId = results[0];
        const storeId = results[1];

        return MasterProductPriceService.create(createMasterProductPriceInfo(masterProductId, storeId));
      })
      .then((result) => {
        expect(result)
          .toBeDefined();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should create the master product price', (done) => {
    let masterProductId;
    let storeId;
    let masterProductPriceId;
    let expectedMasterProductPriceInfo;

    Promise.all([MasterProductService.create(createMasterProductInfo()), StoreService.create(createStoreInfo())])
      .then((results) => {
        masterProductId = results[0];
        storeId = results[1];

        expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId);

        return MasterProductPriceService.create(expectedMasterProductPriceInfo);
      })
      .then((id) => {
        masterProductPriceId = id;

        return MasterProductPriceService.read(masterProductPriceId);
      })
      .then((masterProductPriceInfo) => {
        expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('read', () => {
  test('should reject if the provided master product price Id does not exist', (done) => {
    const masterProductPriceId = uuid();

    MasterProductPriceService.read(masterProductPriceId)
      .catch((error) => {
        expect(error)
          .toBe(`No master product price found with Id: ${masterProductPriceId}`);
        done();
      });
  });

  test('should read the existing master product price', (done) => {
    let masterProductId;
    let storeId;
    let masterProductPriceId;
    let expectedMasterProductPriceInfo;

    Promise.all([MasterProductService.create(createMasterProductInfo()), StoreService.create(createStoreInfo())])
      .then((results) => {
        masterProductId = results[0];
        storeId = results[1];
        expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId);

        return MasterProductPriceService.create(expectedMasterProductPriceInfo);
      })
      .then((id) => {
        masterProductPriceId = id;

        return MasterProductPriceService.read(masterProductPriceId);
      })
      .then((masterProductPriceInfo) => {
        expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('update', () => {
  test('should reject if the provided master product price Id does not exist', (done) => {
    const masterProductPriceId = uuid();

    MasterProductPriceService.update(createMasterProductPriceInfo()
        .set('id', masterProductPriceId))
      .catch((error) => {
        expect(error)
          .toBe(`No master product price found with Id: ${masterProductPriceId}`);
        done();
      });
  });

  test('should return the Id of the updated master product price', (done) => {
    let masterProductPriceId;

    Promise.all([MasterProductService.create(createMasterProductInfo()), StoreService.create(createStoreInfo())])
      .then((results) => {
        const masterProductId = results[0];
        const storeId = results[1];

        return MasterProductPriceService.create(createMasterProductPriceInfo(masterProductId, storeId));
      })
      .then((id) => {
        masterProductPriceId = id;

        return MasterProductPriceService.update(createMasterProductPriceInfo()
          .set('id', masterProductPriceId));
      })
      .then((id) => {
        expect(id)
          .toBe(masterProductPriceId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should update the existing master product price', (done) => {
    let expectedMasterProductPriceInfo;
    let expectedMasterProductId;
    let expectedStoreId;
    let masterProductPriceId;

    Promise.all([MasterProductService.create(createMasterProductInfo()), StoreService.create(createStoreInfo())])
      .then((results) => {
        expectedMasterProductId = results[0];
        expectedStoreId = results[1];
        expectedMasterProductPriceInfo = createMasterProductPriceInfo(expectedMasterProductId, expectedStoreId);

        return MasterProductService.create(createMasterProductInfo());
      })
      .then(id => MasterProductPriceService.create(createMasterProductPriceInfo(id)))
      .then(id => MasterProductPriceService.update(expectedMasterProductPriceInfo.set('id', id)))
      .then((id) => {
        masterProductPriceId = id;

        return MasterProductPriceService.read(masterProductPriceId);
      })
      .then((masterProductPriceInfo) => {
        expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, expectedMasterProductId,
          expectedStoreId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('delete', () => {
  test('should reject if the provided master product price Id does not exist', (done) => {
    const masterProductPriceId = uuid();

    MasterProductPriceService.delete(masterProductPriceId)
      .catch((error) => {
        expect(error)
          .toBe(`No master product price found with Id: ${masterProductPriceId}`);
        done();
      });
  });

  test('should delete the existing master product price', (done) => {
    let masterProductPriceId;

    MasterProductService.create(createMasterProductInfo())
      .then(id => MasterProductPriceService.create(createMasterProductPriceInfo(id)))
      .then((id) => {
        masterProductPriceId = id;
        return MasterProductPriceService.delete(masterProductPriceId);
      })
      .then(() => MasterProductPriceService.read(masterProductPriceId))
      .catch((error) => {
        expect(error)
          .toBe(`No master product price found with Id: ${masterProductPriceId}`);
        done();
      });
  });
});

describe('search', () => {
  test('should return no master product price if provided criteria matches no master product price', (done) => {
    MasterProductPriceService.search(createCriteria())
      .then((masterProductPriceInfos) => {
        expect(masterProductPriceInfos.size)
          .toBe(0);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the master products price matches the criteria', (done) => {
    let expectedMasterProductPriceInfo;
    let masterProductPriceId;
    let masterProductId;
    let storeId;

    Promise.all([MasterProductService.create(createMasterProductInfo()), StoreService.create(createStoreInfo())])
      .then((results) => {
        masterProductId = results[0];
        storeId = results[1];
        expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId);

        return MasterProductPriceService.create(expectedMasterProductPriceInfo);
      })
      .then((id) => {
        masterProductPriceId = id;

        return MasterProductPriceService.search(createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo,
          masterProductId, storeId));
      })
      .then((masterProductPriceInfos) => {
        expect(masterProductPriceInfos.size)
          .toBe(1);

        const masterProductPriceInfo = masterProductPriceInfos.first();
        expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId, storeId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('searchAll', () => {
  test('should return no master product price if provided criteria matches no master product price', (done) => {
    const result = MasterProductPriceService.searchAll(createCriteria());
    let masterProductPrices = List();

    result.event.subscribe((masterProductPrice) => {
      masterProductPrices = masterProductPrices.push(masterProductPrice);
    });
    result.promise.then(() => {
      expect(masterProductPrices.size)
          .toBe(0);
      done();
    })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the master products price matches the criteria', (done) => {
    let masterProductId;
    let storeId;
    let expectedMasterProductPriceInfo;

    Promise.all([MasterProductService.create(createMasterProductInfo()), StoreService.create(createStoreInfo())])
      .then((results) => {
        masterProductId = results[0];
        storeId = results[1];
        expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId);

        return Promise.all([MasterProductPriceService.create(expectedMasterProductPriceInfo), MasterProductPriceService.create(
          expectedMasterProductPriceInfo)]);
      })
      .then((ids) => {
        const masterProductPriceIds = List.of(ids[0], ids[1]);
        const result = MasterProductPriceService.searchAll(createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo,
          masterProductId, storeId));
        let masterProductPrices = List();

        result.event.subscribe((masterProductPrice) => {
          masterProductPrices = masterProductPrices.push(masterProductPrice);
        });
        result.promise.then(() => {
          expect(masterProductPrices.size)
              .toBe(masterProductPriceIds.size);
          done();
        })
          .catch((error) => {
            fail(error);
            done();
          });
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('exists', () => {
  test('should return false if no master product price match provided criteria', (done) => {
    MasterProductPriceService.exists(createCriteria())
      .then((response) => {
        expect(response)
          .toBeFalsy();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return true if any master product price match provided criteria', (done) => {
    let expectedMasterProductPriceInfo;
    let masterProductId;
    let storeId;

    Promise.all([MasterProductService.create(createMasterProductInfo()), StoreService.create(createStoreInfo())])
      .then((results) => {
        masterProductId = results[0];
        storeId = results[1];

        expectedMasterProductPriceInfo = createMasterProductPriceInfo(masterProductId, storeId);

        return MasterProductPriceService.create(expectedMasterProductPriceInfo);
      })
      .then(() => MasterProductPriceService.exists(createCriteriaUsingProvidedMasterProductPriceInfo(expectedMasterProductPriceInfo,
        masterProductId, storeId)))
      .then((response) => {
        expect(response)
          .toBeTruthy();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});
