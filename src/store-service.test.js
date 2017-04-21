import {
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import '../bootstrap';
import {
  StoreService,
} from './store-service';

describe('create', () => {
  test('should return the created store Id', () =>
    StoreService.create(Map({
      name: uuid(),
    }))
    .then(result => expect(result)
      .toBeDefined()),
  );

  test('should create the store', (done) => {
    const expectedVal = Map({
      name: uuid(),
    });

    StoreService.create(expectedVal)
      .then(storeId => StoreService.read(storeId))
      .then((store) => {
        expect(store.get('name'))
          .toBe(expectedVal.get('name'));
        done();
      });
  });
});

describe('read', () => {
  test('should reject if the provided store Id does not exist', (done) => {
    const storeId = uuid();

    StoreService.read(storeId)
      .catch((error) => {
        expect(error)
          .toBe(`No store found with Id: ${storeId}`);
        done();
      });
  });

  test('should read the existing store', (done) => {
    const expectedVal = Map({
      name: uuid(),
    });

    StoreService.create(expectedVal)
      .then(storeId => StoreService.read(storeId))
      .then((store) => {
        expect(store.get('name'))
          .toBe(expectedVal.get('name'));
        done();
      });
  });
});

describe('search', () => {
  test('should return no store if provided criteria matches no store', (done) => {
    const criteria = Map({
      name: uuid(),
    });

    StoreService.search(criteria)
      .then((stores) => {
        expect(stores.size)
          .toBe(0);
        done();
      });
  });

  test('should return the stores matches the criteria', (done) => {
    const expectedVal = Map({
      name: uuid(),
    });
    const criteria = Map({
      name: expectedVal.get('name'),
    });

    StoreService.create(expectedVal)
      .then(() => StoreService.search(criteria))
      .then((stores) => {
        expect(stores.size)
          .toBe(1);
        expect(stores.first()
            .get('name'))
          .toBe(expectedVal.get('name'));
        done();
      });
  });
});

describe('exists', () => {
  test('should return false if no store match provided criteria', (done) => {
    const criteria = Map({
      name: uuid(),
    });

    StoreService.exists(criteria)
      .then((response) => {
        expect(response)
          .toBeFalsy();
        done();
      });
  });

  test('should return true if any store match provided criteria', (done) => {
    const expectedVal = Map({
      name: uuid(),
    });
    const criteria = Map({
      name: expectedVal.get('name'),
    });

    StoreService.create(expectedVal)
      .then(() => StoreService.exists(criteria))
      .then((response) => {
        expect(response)
          .toBeTruthy();
        done();
      });
  });
});
