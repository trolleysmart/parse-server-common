import {
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import '../bootstrap';
import {
  MasterProductService,
} from './master-product-service';
import {
  createMasterProductInfo,
} from './schema/master-product.test';

function expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId) {
  expect(masterProductInfo.get('id'))
    .toBe(masterProductId);
  expect(masterProductInfo.get('description'))
    .toBe(expectedMasterProductInfo.get('description'));
  expect(masterProductInfo.get('barcode')
      .some())
    .toBe(expectedMasterProductInfo.get('barcode'));
  expect(masterProductInfo.get('imageUrl')
      .some())
    .toBe(expectedMasterProductInfo.get('imageUrl'));
}

export function createCriteria() {
  return Map({
    description: uuid(),
    barcode: uuid(),
    imageUrl: uuid(),
  });
}

export function createCriteriaUsingProvidedMasterProductInfo(masterProductInfo) {
  return Map({
    description: masterProductInfo.get('description'),
    barcode: masterProductInfo.get('barcode'),
    imageUrl: masterProductInfo.get('imageUrl'),
  });
}

describe('create', () => {
  test('should return the created master product Id', (done) => {
    MasterProductService.create(createMasterProductInfo())
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

  test('should create the masterProduct', (done) => {
    const expectedMasterProductInfo = createMasterProductInfo();
    let masterProductId;

    MasterProductService.create(expectedMasterProductInfo)
      .then((id) => {
        masterProductId = id;

        return MasterProductService.read(masterProductId);
      })
      .then((masterProductInfo) => {
        expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('read', () => {
  test('should reject if the provided master product Id does not exist', (done) => {
    const masterProductId = uuid();

    MasterProductService.read(masterProductId)
      .catch((error) => {
        expect(error)
          .toBe(`No master product found with Id: ${masterProductId}`);
        done();
      });
  });

  test('should read the existing masterProduct', (done) => {
    const expectedMasterProductInfo = createMasterProductInfo();
    let masterProductId;

    MasterProductService.create(expectedMasterProductInfo)
      .then((id) => {
        masterProductId = id;

        return MasterProductService.read(masterProductId);
      })
      .then((masterProductInfo) => {
        expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('update', () => {
  test('should reject if the provided master product Id does not exist', (done) => {
    const masterProductId = uuid();

    MasterProductService.update(masterProductId, createMasterProductInfo())
      .catch((error) => {
        expect(error)
          .toBe(`No master product found with Id: ${masterProductId}`);
        done();
      });
  });

  test('should return the Id of the updated masterProduct', (done) => {
    let masterProductId;

    MasterProductService.create(createMasterProductInfo())
      .then((id) => {
        masterProductId = id;

        return MasterProductService.update(masterProductId, createMasterProductInfo());
      })
      .then((id) => {
        expect(id)
          .toBe(masterProductId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should update the existing masterProduct', (done) => {
    const expectedMasterProductInfo = createMasterProductInfo();
    let masterProductId;

    MasterProductService.create(createMasterProductInfo())
      .then(id => MasterProductService.update(id, expectedMasterProductInfo))
      .then((id) => {
        masterProductId = id;

        return MasterProductService.read(masterProductId);
      })
      .then((masterProductInfo) => {
        expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('delete', () => {
  test('should reject if the provided master product Id does not exist', (done) => {
    const masterProductId = uuid();

    MasterProductService.delete(masterProductId)
      .catch((error) => {
        expect(error)
          .toBe(`No master product found with Id: ${masterProductId}`);
        done();
      });
  });

  test('should delete the existing masterProduct', (done) => {
    let masterProductId;

    MasterProductService.create(createMasterProductInfo())
      .then((id) => {
        masterProductId = id;
        return MasterProductService.delete(masterProductId);
      })
      .then(() => MasterProductService.read(masterProductId))
      .catch((error) => {
        expect(error)
          .toBe(`No master product found with Id: ${masterProductId}`);
        done();
      });
  });
});

describe('search', () => {
  test('should return no master product if provided criteria matches no masterProduct', (done) => {
    MasterProductService.search(createCriteria())
      .then((masterProducts) => {
        expect(masterProducts.size)
          .toBe(0);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the masterProducts matches the criteria', (done) => {
    const expectedMasterProductInfo = createMasterProductInfo();
    let masterProductId;

    MasterProductService.create(expectedMasterProductInfo)
      .then((id) => {
        masterProductId = id;

        return MasterProductService.search(createCriteriaUsingProvidedMasterProductInfo(expectedMasterProductInfo));
      })
      .then((masterProductInfos) => {
        expect(masterProductInfos.size)
          .toBe(1);

        const masterProductInfo = masterProductInfos.first();
        expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId);
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
    MasterProductService.exists(createCriteria())
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
    const masterProductInfo = createMasterProductInfo();

    MasterProductService.create(masterProductInfo)
      .then(() => MasterProductService.exists(createCriteriaUsingProvidedMasterProductInfo(masterProductInfo)))
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
