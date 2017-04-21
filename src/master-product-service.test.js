import {
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import '../bootstrap';
import {
  MasterProductService,
} from './master-product-service';

describe('create', () => {
  test('should return the created master product Id', () =>
    MasterProductService.create(Map({
      description: uuid(),
      barcode: uuid(),
      imageUrl: uuid(),
    }))
    .then(result => expect(result)
      .toBeDefined()),
  );

  test('should create the master product', (done) => {
    const expectedVal = Map({
      description: uuid(),
      barcode: uuid(),
      imageUrl: uuid(),
    });

    MasterProductService.create(expectedVal)
      .then(masterProductId => MasterProductService.read(masterProductId))
      .then((masterProduct) => {
        expect(masterProduct.get('description'))
          .toBe(expectedVal.get('description'));
        expect(masterProduct.get('barcode').some())
          .toBe(expectedVal.get('barcode'));
        expect(masterProduct.get('imageUrl').some())
          .toBe(expectedVal.get('imageUrl'));
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

  test('should read the existing master product', (done) => {
    const expectedVal = Map({
      description: uuid(),
      barcode: uuid(),
      imageUrl: uuid(),
    });

    MasterProductService.create(expectedVal)
      .then(masterProductId => MasterProductService.read(masterProductId))
      .then((masterProduct) => {
        expect(masterProduct.get('description'))
          .toBe(expectedVal.get('description'));
        expect(masterProduct.get('barcode').some())
          .toBe(expectedVal.get('barcode'));
        expect(masterProduct.get('imageUrl').some())
          .toBe(expectedVal.get('imageUrl'));
        done();
      });
  });
});

describe('search', () => {
  test('should return no master product if provided criteria matches no master product', (done) => {
    const criteria = Map({
      description: uuid(),
      barcode: uuid(),
      imageUrl: uuid(),
    });

    MasterProductService.search(criteria)
      .then((masterProducts) => {
        expect(masterProducts.size)
          .toBe(0);
        done();
      });
  });

  test('should return the master products matches the criteria', (done) => {
    const expectedVal = Map({
      description: uuid(),
      barcode: uuid(),
      imageUrl: uuid(),
    });
    const criteria = Map({
      description: expectedVal.get('description'),
      barcode: expectedVal.get('barcode'),
      imageUrl: expectedVal.get('imageUrl'),
    });

    MasterProductService.create(expectedVal)
      .then(() => MasterProductService.search(criteria))
      .then((masterProducts) => {
        expect(masterProducts.size)
          .toBe(1);
        expect(masterProducts.first()
            .get('description'))
          .toBe(expectedVal.get('description'));
        expect(masterProducts.first()
            .get('barcode').some())
          .toBe(expectedVal.get('barcode'));
        expect(masterProducts.first()
            .get('imageUrl').some())
          .toBe(expectedVal.get('imageUrl'));
        done();
      });
  });
});

describe('exists', () => {
  test('should return false if no master product match provided criteria', (done) => {
    const criteria = Map({
      description: uuid(),
      barcode: uuid(),
      imageUrl: uuid(),
    });

    MasterProductService.exists(criteria)
      .then((response) => {
        expect(response)
          .toBeFalsy();
        done();
      });
  });

  test('should return true if any master product match provided criteria', (done) => {
    const expectedVal = Map({
      description: uuid(),
      barcode: uuid(),
      imageUrl: uuid(),
    });
    const criteria = Map({
      description: expectedVal.get('description'),
      barcode: expectedVal.get('barcode'),
      imageUrl: expectedVal.get('imageUrl'),
    });

    MasterProductService.create(expectedVal)
      .then(() => MasterProductService.exists(criteria))
      .then((response) => {
        expect(response)
          .toBeTruthy();
        done();
      });
  });
});
