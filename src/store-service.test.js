import {
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import '../bootstrap';
import {
  StoreService,
} from './store-service';

function createStoreInfo() {
  return Map({
    name: uuid(),
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
    const storeInfo = createStoreInfo();

    StoreService.create(storeInfo)
      .then(storeId => StoreService.read(storeId))
      .then((store) => {
        expect(store.get('name'))
          .toBe(storeInfo.get('name'));
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
    const storeInfo = createStoreInfo();

    StoreService.create(storeInfo)
      .then(storeId => StoreService.read(storeId))
      .then((store) => {
        expect(store.get('name'))
          .toBe(storeInfo.get('name'));
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

    StoreService.update(storeId, createStoreInfo())
      .catch((error) => {
        expect(error)
          .toBe(`No store found with Id: ${storeId}`);
        done();
      });
  });

  test('should return the Id of the updated store', (done) => {
    const storeInfo = createStoreInfo();
    const updatedStoreInfo = createStoreInfo();
    let storeId;

    StoreService.create(storeInfo)
      .then((id) => {
        storeId = id;

        return StoreService.update(storeId, updatedStoreInfo);
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
    const storeInfo = createStoreInfo();
    const updatedStoreInfo = createStoreInfo();

    StoreService.create(storeInfo)
      .then(storeId => StoreService.update(storeId, updatedStoreInfo))
      .then(storeId => StoreService.read(storeId))
      .then((store) => {
        expect(store.get('name'))
          .toBe(updatedStoreInfo.get('name'));
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
    const storeInfo = createStoreInfo();
    let storeId;

    StoreService.create(storeInfo)
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
    const criteria = Map({
      name: uuid(),
    });

    StoreService.search(criteria)
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
    const storeInfo = createStoreInfo();
    const criteria = Map({
      name: storeInfo.get('name'),
    });

    let storeId;

    StoreService.create(storeInfo)
      .then((id) => {
        storeId = id;

        return StoreService.search(criteria);
      })
      .then((stores) => {
        expect(stores.size)
          .toBe(1);

        const store = stores.first();
        expect(store.get('id'))
          .toBe(storeId);
        expect(store.get('name'))
          .toBe(storeInfo.get('name'));
        done();
      })
      .catch((error) => {
        fail(error);
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
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return true if any store match provided criteria', (done) => {
    const storeInfo = createStoreInfo();
    const criteria = Map({
      name: storeInfo.get('name'),
    });

    StoreService.create(storeInfo)
      .then(() => StoreService.exists(criteria))
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
