import {
  List,
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import {
  UserService,
} from 'micro-business-parse-server-common';
import '../bootstrap';
import ShoppingListService from './shopping-list-service';
import {
  createShoppingListInfo,
} from './schema/shopping-list.test';

function expectShoppingListInfo(shoppingListInfo, expectedShoppingListInfo, shoppingListId) {
  expect(shoppingListInfo.get('id'))
    .toBe(shoppingListId);
  expect(shoppingListInfo.get('userId'))
    .toBe(expectedShoppingListInfo.get('userId'));
  expect(shoppingListInfo.get('stapleShoppingList'))
    .toEqual(expectedShoppingListInfo.get('stapleShoppingList'));
  expect(shoppingListInfo.get('masterProductPrices'))
    .toEqual(expectedShoppingListInfo.get('masterProductPrices'));
}

function createCriteria() {
  return Map({
    fields: List.of('user', 'stapleShoppingList', 'masterProductPrices'),
    conditions: Map({
      userId: uuid(),
    }),
  });
}

function createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo) {
  return Map({
    fields: List.of('user', 'stapleShoppingList', 'masterProductPrices'),
    conditions: Map({
      userId: shoppingListInfo.get('userId'),
    }),
  });
}

let userId;

beforeEach(() => new Promise((resolve, reject) => {
  UserService.signUpWithUsernameAndPassword(`${uuid()}@email.com`, '123456')
    .then((user) => {
      userId = user.id;
      resolve();
    })
    .catch(error => reject(error));
}));

describe('create', () => {
  test('should return the created shopping list Id', (done) => {
    ShoppingListService.create(createShoppingListInfo(userId))
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

  test('should create the shopping list', (done) => {
    const expectedShoppingListInfo = createShoppingListInfo(userId);
    let shoppingListId;

    ShoppingListService.create(expectedShoppingListInfo)
      .then((id) => {
        shoppingListId = id;

        return ShoppingListService.read(shoppingListId);
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
  test('should reject if the provided shopping list Id does not exist', (done) => {
    const shoppingListId = uuid();

    ShoppingListService.read(shoppingListId)
      .catch((error) => {
        expect(error)
          .toBe(`No shopping list found with Id: ${shoppingListId}`);
        done();
      });
  });

  test('should read the existing shopping list', (done) => {
    const expectedStoreInfo = createShoppingListInfo(userId);
    let shoppingListId;

    ShoppingListService.create(expectedStoreInfo)
      .then((id) => {
        shoppingListId = id;

        return ShoppingListService.read(shoppingListId);
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
  test('should reject if the provided shopping list Id does not exist', (done) => {
    const shoppingListId = uuid();

    ShoppingListService.update(createShoppingListInfo(userId)
        .set('id', shoppingListId))
      .catch((error) => {
        expect(error)
          .toBe(`No shopping list found with Id: ${shoppingListId}`);
        done();
      });
  });

  test('should return the Id of the updated shopping list', (done) => {
    let shoppingListId;

    ShoppingListService.create(createShoppingListInfo(userId))
      .then((id) => {
        shoppingListId = id;

        return ShoppingListService.update(createShoppingListInfo(userId)
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

  test('should update the existing shopping list', (done) => {
    const expectedShoppingListInfo = createShoppingListInfo(userId);
    let shoppingListId;

    ShoppingListService.create(createShoppingListInfo(userId))
      .then(id => ShoppingListService.update(expectedShoppingListInfo.set('id', id)))
      .then((id) => {
        shoppingListId = id;

        return ShoppingListService.read(shoppingListId);
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
  test('should reject if the provided shopping list Id does not exist', (done) => {
    const shoppingListId = uuid();

    ShoppingListService.delete(shoppingListId)
      .catch((error) => {
        expect(error)
          .toBe(`No shopping list found with Id: ${shoppingListId}`);
        done();
      });
  });

  test('should delete the existing shopping list', (done) => {
    let shoppingListId;

    ShoppingListService.create(createShoppingListInfo(userId))
      .then((id) => {
        shoppingListId = id;
        return ShoppingListService.delete(shoppingListId);
      })
      .then(() => ShoppingListService.read(shoppingListId))
      .catch((error) => {
        expect(error)
          .toBe(`No shopping list found with Id: ${shoppingListId}`);
        done();
      });
  });
});

describe('search', () => {
  test('should return no shopping list if provided criteria matches no shopping list', (done) => {
    ShoppingListService.search(createCriteria())
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

  test('should return the shopping lists matches the criteria', (done) => {
    const expectedShoppingListInfo = createShoppingListInfo(userId);
    let shoppingListId;

    ShoppingListService.create(expectedShoppingListInfo)
      .then((id) => {
        shoppingListId = id;

        return ShoppingListService.search(createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo));
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
  test('should return no shopping list if provided criteria matches no shopping list', (done) => {
    const result = ShoppingListService.searchAll(createCriteria());
    let shoppingLists = List();

    result.event.subscribe((shoppingList) => {
      shoppingLists = shoppingLists.push(shoppingList);
    });
    result.promise.then(() => {
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

  test('should return the shopping list matches the criteria', (done) => {
    const expectedShoppingListInfo = createShoppingListInfo(userId);

    Promise.all([ShoppingListService.create(expectedShoppingListInfo), ShoppingListService.create(expectedShoppingListInfo)])
      .then((ids) => {
        const shoppingListIds = List.of(ids[0], ids[1]);
        const result = ShoppingListService.searchAll(createCriteriaUsingProvidedShoppingListInfo(expectedShoppingListInfo));
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
  test('should return false if no shopping list match provided criteria', (done) => {
    ShoppingListService.exists(createCriteria())
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

  test('should return true if any shopping list match provided criteria', (done) => {
    const shoppingListInfo = createShoppingListInfo(userId);

    ShoppingListService.create(shoppingListInfo)
      .then(() => ShoppingListService.exists(createCriteriaUsingProvidedShoppingListInfo(shoppingListInfo)))
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
