import {
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
  createMasterProductInfo,
} from './schema/master-product.test';
import {
  createMasterProductPriceInfo,
} from './schema/master-product-price.test';

function expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId) {
  expect(masterProductPriceInfo.get('id'))
    .toBe(masterProductPriceId);
  expect(masterProductPriceInfo.get('masterProduct')
      .getId())
    .toBe(masterProductId);
  expect(masterProductPriceInfo.get('priceDetails'))
    .toEqual(expectedMasterProductPriceInfo.get('priceDetails'));
}

export function createCriteria() {
  return Map({
    masterProductId: uuid(),
  });
}

export function createCriteriaUsingProvidedMasterProductPriceInfo(masterProductId) {
  return Map({
    masterProductId,
  });
}

describe('create', () => {
  test('should return the created master product price Id', (done) => {
    MasterProductService.create(createMasterProductInfo())
      .then(id => MasterProductPriceService.create(createMasterProductPriceInfo(id)))
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
    const expectedMasterProductInfo = createMasterProductInfo();
    let masterProductId;
    let masterProductPriceId;
    let expectedMasterProductPriceInfo;

    MasterProductService.create(expectedMasterProductInfo)
      .then((id) => {
        masterProductId = id;
        expectedMasterProductPriceInfo = createMasterProductPriceInfo(id);

        return MasterProductPriceService.create(expectedMasterProductPriceInfo);
      })
      .then((id) => {
        masterProductPriceId = id;

        return MasterProductPriceService.read(masterProductPriceId);
      })
      .then((masterProductPriceInfo) => {
        expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId);
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
    const expectedMasterProductInfo = createMasterProductInfo();
    let masterProductId;
    let masterProductPriceId;
    let expectedMasterProductPriceInfo;

    MasterProductService.create(expectedMasterProductInfo)
      .then((id) => {
        masterProductId = id;
        expectedMasterProductPriceInfo = createMasterProductPriceInfo(id);

        return MasterProductPriceService.create(expectedMasterProductPriceInfo);
      })
      .then((id) => {
        masterProductPriceId = id;

        return MasterProductPriceService.read(masterProductPriceId);
      })
      .then((masterProductPriceInfo) => {
        expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId);
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

    MasterProductPriceService.update(masterProductPriceId, createMasterProductPriceInfo())
      .catch((error) => {
        expect(error)
          .toBe(`No master product price found with Id: ${masterProductPriceId}`);
        done();
      });
  });

  test('should return the Id of the updated master product price', (done) => {
    let masterProductPriceId;

    MasterProductService.create(createMasterProductInfo())
      .then(id => MasterProductPriceService.create(createMasterProductPriceInfo(id)))
      .then((id) => {
        masterProductPriceId = id;

        return MasterProductPriceService.update(masterProductPriceId, createMasterProductPriceInfo());
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
    let masterProductPriceId;

    MasterProductService.create(createMasterProductInfo())
      .then((id) => {
        expectedMasterProductId = id;
        expectedMasterProductPriceInfo = createMasterProductPriceInfo(expectedMasterProductId);

        return MasterProductService.create(createMasterProductInfo());
      })
      .then(id => MasterProductPriceService.create(createMasterProductPriceInfo(id)))
      .then(id => MasterProductPriceService.update(id, expectedMasterProductPriceInfo))
      .then((id) => {
        masterProductPriceId = id;

        return MasterProductPriceService.read(masterProductPriceId);
      })
      .then((masterProductPriceInfo) => {
        expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, expectedMasterProductId);
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

    MasterProductService.create(createMasterProductInfo())
      .then((id) => {
        masterProductId = id;
        expectedMasterProductPriceInfo = createMasterProductPriceInfo(id);

        return MasterProductPriceService.create(expectedMasterProductPriceInfo);
      })
      .then((id) => {
        masterProductPriceId = id;

        return MasterProductPriceService.search(createCriteriaUsingProvidedMasterProductPriceInfo(masterProductId));
      })
      .then((masterProductPriceInfos) => {
        expect(masterProductPriceInfos.size)
          .toBe(1);

        const masterProductPriceInfo = masterProductPriceInfos.first();
        expectMasterProductPriceInfo(masterProductPriceInfo, expectedMasterProductPriceInfo, masterProductPriceId, masterProductId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('exists', () => {
  test('should return false if no master product match provided criteria', (done) => {
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

  test('should return true if any master product match provided criteria', (done) => {
    let masterProductId;

    MasterProductService.create(createMasterProductInfo())
      .then((id) => {
        masterProductId = id;

        return MasterProductPriceService.create(createMasterProductPriceInfo(id));
      })
      .then(() => MasterProductPriceService.exists(createCriteriaUsingProvidedMasterProductPriceInfo(masterProductId)))
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
