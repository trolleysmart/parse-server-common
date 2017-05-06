import {
  List,
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import {
  UserService,
} from 'micro-business-parse-server-common';
import '../bootstrap';
import StapleShoppingListService from './staple-shopping-list-service';
import {
  createStapleShoppingListInfo,
} from './schema/staple-shopping-list.test';

function expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId) {
  expect(shoppingListInfo.get('id'))
    .toBe(shoppingListId);
  expect(shoppingListInfo.get('userId'))
    .toBe(expectedShoppingListInfo.get('userId'));
  expect(shoppingListInfo.get('items'))
    .toEqual(expectedShoppingListInfo.get('items'));
}

function createCriteria() {
  return Map({
    fields: List.of('user', 'items'),
    conditions: Map({
      userId: uuid(),
    }),
  });
}

function createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo) {
  return Map({
    fields: List.of('user', 'items'),
    conditions: Map({
      userId: shoppingListInfo.get('userId'),
    }),
  });
}

let userId;

beforeEach(() => new Promise((resolve, reject) => {
  UserService.signUpWithEmailAndPassword(`${uuid()}@email.com`, '123456')
    .then((user) => {
      userId = user.id;
      resolve();
    })
    .catch(error => reject(error));
}));

describe('create', () => {
  test('should return the created staple shopping list Id', (done) => {
    StapleShoppingListService.create(createStapleShoppingListInfo(userId))
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

  test('should create the staple shopping list', (done) => {
    const expectedShoppingListInfo = createStapleShoppingListInfo(userId);
    let shoppingListId;

    StapleShoppingListService.create(expectedShoppingListInfo)
      .then((id) => {
        shoppingListId = id;

        return StapleShoppingListService.read(shoppingListId);
      })
      .then((shoppingListInfo) => {
        expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('read', () => {
  test('should reject if the provided staple shopping list Id does not exist', (done) => {
    const shoppingListId = uuid();

    StapleShoppingListService.read(shoppingListId)
      .catch((error) => {
        expect(error)
          .toBe(`No staple shopping list found with Id: ${shoppingListId}`);
        done();
      });
  });

  test('should read the existing staple shopping list', (done) => {
    const expectedStoreInfo = createStapleShoppingListInfo(userId);
    let shoppingListId;

    StapleShoppingListService.create(expectedStoreInfo)
      .then((id) => {
        shoppingListId = id;

        return StapleShoppingListService.read(shoppingListId);
      })
      .then((shoppingListInfo) => {
        expectShoppingListInfo(shoppingListInfo, expectedStoreInfo, shoppingListId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('update', () => {
  test('should reject if the provided staple shopping list Id does not exist', (done) => {
    const shoppingListId = uuid();

    StapleShoppingListService.update(createStapleShoppingListInfo(userId)
        .set('id', shoppingListId))
      .catch((error) => {
        expect(error)
          .toBe(`No staple shopping list found with Id: ${shoppingListId}`);
        done();
      });
  });

  test('should return the Id of the updated staple shopping list', (done) => {
    let shoppingListId;

    StapleShoppingListService.create(createStapleShoppingListInfo(userId))
      .then((id) => {
        shoppingListId = id;

        return StapleShoppingListService.update(createStapleShoppingListInfo(userId)
          .set('id', shoppingListId));
      })
      .then((id) => {
        expect(id)
          .toBe(shoppingListId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should update the existing staple shopping list', (done) => {
    const expectedShoppingListInfo = createStapleShoppingListInfo(userId);
    let shoppingListId;

    StapleShoppingListService.create(createStapleShoppingListInfo(userId))
      .then(id => StapleShoppingListService.update(expectedShoppingListInfo.set('id', id)))
      .then((id) => {
        shoppingListId = id;

        return StapleShoppingListService.read(shoppingListId);
      })
      .then((storeInfo) => {
        expectShoppingListInfo(storeInfo, expectedShoppingListInfo, shoppingListId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('delete', () => {
  test('should reject if the provided staple shopping list Id does not exist', (done) => {
    const shoppingListId = uuid();

    StapleShoppingListService.delete(shoppingListId)
      .catch((error) => {
        expect(error)
          .toBe(`No staple shopping list found with Id: ${shoppingListId}`);
        done();
      });
  });

  test('should delete the existing staple shopping list', (done) => {
    let shoppingListId;

    StapleShoppingListService.create(createStapleShoppingListInfo(userId))
      .then((id) => {
        shoppingListId = id;
        return StapleShoppingListService.delete(shoppingListId);
      })
      .then(() => StapleShoppingListService.read(shoppingListId))
      .catch((error) => {
        expect(error)
          .toBe(`No staple shopping list found with Id: ${shoppingListId}`);
        done();
      });
  });
});

describe('search', () => {
  test('should return no staple shopping list if provided criteria matches no staple shopping list', (done) => {
    StapleShoppingListService.search(createCriteria())
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

  test('should return the staple shopping lists matches the criteria', (done) => {
    const expectedShoppingListInfo = createStapleShoppingListInfo(userId);
    let shoppingListId;

    StapleShoppingListService.create(expectedShoppingListInfo)
      .then((id) => {
        shoppingListId = id;

        return StapleShoppingListService.search(createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo));
      })
      .then((shoppingListInfos) => {
        expect(shoppingListInfos.size)
          .toBe(1);

        const shoppingListInfo = shoppingListInfos.first();
        expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('searchAll', () => {
  test('should return no staple shopping list if provided criteria matches no staple shopping list', (done) => {
    const result = StapleShoppingListService.searchAll(createCriteria());
    let shoppingLists = List();

    result.event.subscribe((shoppingList) => {
      shoppingLists = shoppingLists.push(shoppingList);
    });

    result.promise.then(() => {
      result.event.unsubscribeAll();
      result.event.unsubscribeAll();
      expect(shoppingLists.size)
          .toBe(0);
      done();
    })
      .catch((error) => {
        result.event.unsubscribeAll();
        fail(error);
        done();
      });
  });

  test('should return the staple shopping list matches the criteria', (done) => {
    const expectedShoppingListInfo = createStapleShoppingListInfo(userId);

    Promise.all([StapleShoppingListService.create(expectedShoppingListInfo), StapleShoppingListService.create(expectedShoppingListInfo)])
      .then((ids) => {
        const shoppingListIds = List.of(ids[0], ids[1]);
        const result = StapleShoppingListService.searchAll(createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo));
        let shoppingLists = List();

        result.event.subscribe((shoppingList) => {
          shoppingLists = shoppingLists.push(shoppingList);
        });
        result.promise.then(() => {
          result.event.unsubscribeAll();
          expect(shoppingLists.size)
              .toBe(shoppingListIds.size);
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
  test('should return false if no staple shopping list match provided criteria', (done) => {
    StapleShoppingListService.exists(createCriteria())
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

  test('should return true if any staple shopping list match provided criteria', (done) => {
    const shoppingListInfo = createStapleShoppingListInfo(userId);

    StapleShoppingListService.create(shoppingListInfo)
      .then(() => StapleShoppingListService.exists(createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo)))
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
