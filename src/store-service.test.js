import {
  List,
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import '../bootstrap';
import StoreService from './store-service';
import {
  createStoreInfo,
} from './schema/store.test';

function expectStoreInfo(storeInfo, expectedStoreInfo, storeId) {
  expect(storeInfo.get('id'))
    .toBe(storeId);
  expect(storeInfo.get('name'))
    .toBe(expectedStoreInfo.get('name'));
  expect(storeInfo.get('imageUrl'))
    .toBe(expectedStoreInfo.get('imageUrl'));
}

function createCriteria() {
  return Map({
    fields: List.of('name', 'imageUrl'),
    conditions: Map({
      name: uuid(),
    }),
  });
}

function createCriteriaUsingProvidedStoreInfo(storeInfo) {
  return Map({
    fields: List.of('name', 'imageUrl'),
    conditions: Map({
      name: storeInfo.get('name'),
    }),
  });
}

describe('create', () => {
  test('should return the created store Id', (done) => {
    StoreService.create(createStoreInfo())
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

  test('should create the store', (done) => {
    const expectedStoreInfo = createStoreInfo();
    let storeId;

    StoreService.create(expectedStoreInfo)
      .then((id) => {
        storeId = id;

        return StoreService.read(storeId);
      })
      .then((storeInfo) => {
        expectStoreInfo(storeInfo, expectedStoreInfo, storeId);
        done();
      })
      .catch((error) => {
        fail(error);
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
    const expectedStoreInfo = createStoreInfo();
    let storeId;

    StoreService.create(expectedStoreInfo)
      .then((id) => {
        storeId = id;

        return StoreService.read(storeId);
      })
      .then((storeInfo) => {
        expectStoreInfo(storeInfo, expectedStoreInfo, storeId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('update', () => {
  test('should reject if the provided store Id does not exist', (done) => {
    const storeId = uuid();

    StoreService.update(createStoreInfo()
        .set('id', storeId))
      .catch((error) => {
        expect(error)
          .toBe(`No store found with Id: ${storeId}`);
        done();
      });
  });

  test('should return the Id of the updated store', (done) => {
    let storeId;

    StoreService.create(createStoreInfo())
      .then((id) => {
        storeId = id;

        return StoreService.update(createStoreInfo()
          .set('id', storeId));
      })
      .then((id) => {
        expect(id)
          .toBe(storeId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should update the existing store', (done) => {
    const expectedStoreInfo = createStoreInfo();
    let storeId;

    StoreService.create(createStoreInfo())
      .then(id => StoreService.update(expectedStoreInfo.set('id', id)))
      .then((id) => {
        storeId = id;

        return StoreService.read(storeId);
      })
      .then((storeInfo) => {
        expectStoreInfo(storeInfo, expectedStoreInfo, storeId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('delete', () => {
  test('should reject if the provided store Id does not exist', (done) => {
    const storeId = uuid();

    StoreService.delete(storeId)
      .catch((error) => {
        expect(error)
          .toBe(`No store found with Id: ${storeId}`);
        done();
      });
  });

  test('should delete the existing store', (done) => {
    let storeId;

    StoreService.create(createStoreInfo())
      .then((id) => {
        storeId = id;
        return StoreService.delete(storeId);
      })
      .then(() => StoreService.read(storeId))
      .catch((error) => {
        expect(error)
          .toBe(`No store found with Id: ${storeId}`);
        done();
      });
  });
});

describe('search', () => {
  test('should return no store if provided criteria matches no store', (done) => {
    StoreService.search(createCriteria())
      .then((stores) => {
        expect(stores.size)
          .toBe(0);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the stores matches the criteria', (done) => {
    const expectedStoreInfo = createStoreInfo();
    let storeId;

    StoreService.create(expectedStoreInfo)
      .then((id) => {
        storeId = id;

        return StoreService.search(createCriteriaUsingProvidedStoreInfo(expectedStoreInfo));
      })
      .then((storeInfos) => {
        expect(storeInfos.size)
          .toBe(1);

        const storeInfo = storeInfos.first();
        expectStoreInfo(storeInfo, expectedStoreInfo, storeId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('searchAll', () => {
  test('should return no store if provided criteria matches no store', (done) => {
    const result = StoreService.searchAll(createCriteria());
    let stores = List();

    result.event.subscribe((store) => {
      stores = stores.push(store);
    });
    result.promise.then(() => {
      result.event.unsubscribeAll();
      expect(stores.size)
          .toBe(0);
      done();
    })
      .catch((error) => {
        result.event.unsubscribeAll();
        fail(error);
        done();
      });
  });

  test('should return the stores matches the criteria', (done) => {
    const expectedStoreInfo = createStoreInfo();

    Promise.all([StoreService.create(expectedStoreInfo), StoreService.create(expectedStoreInfo)])
      .then((ids) => {
        const storeIds = List.of(ids[0], ids[1]);
        const result = StoreService.searchAll(createCriteriaUsingProvidedStoreInfo(expectedStoreInfo));
        let stores = List();

        result.event.subscribe((store) => {
          stores = stores.push(store);
        });
        result.promise.then(() => {
          result.event.unsubscribeAll();
          expect(stores.size)
              .toBe(storeIds.size);
          done();
        })
          .catch((error) => {
            result.event.unsubscribeAll();
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
  test('should return false if no store match provided criteria', (done) => {
    StoreService.exists(createCriteria())
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

  test('should return true if any store match provided criteria', (done) => {
    const storeInfo = createStoreInfo();

    StoreService.create(storeInfo)
      .then(() => StoreService.exists(createCriteriaUsingProvidedStoreInfo(storeInfo)))
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
