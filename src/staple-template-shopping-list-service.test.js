import {
  List,
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import '../bootstrap';
import {
  StapleTemplateShoppingListService,
} from './staple-template-shopping-list-service';
import {
  createStapleTemplateShoppingListInfo,
} from './schema/staple-template-shopping-list.test';

function expectMasterProductInfo(masterProductInfo, expectedMasterProductInfo, masterProductId) {
  expect(masterProductInfo.get('id'))
    .toBe(masterProductId);
  expect(masterProductInfo.get('description'))
    .toBe(expectedMasterProductInfo.get('description'));
  expect(masterProductInfo.get('templates'))
    .toEqual(expectedMasterProductInfo.get('templates'));
}

export function createCriteria() {
  return Map({
    fields: List.of('description', 'templates'),
    conditions: Map({
      description: uuid(),
    }),
  });
}

export function createCriteriaUsingProvidedMasterProductInfo(masterProductInfo) {
  return Map({
    fields: List.of('description', 'templates'),
    conditions: Map({
      description: masterProductInfo.get('description'),
      templateIds: masterProductInfo.get('templates'),
    }),
  });
}

describe('create', () => {
  test('should return the created staple template shopping list Id', (done) => {
    StapleTemplateShoppingListService.create(createStapleTemplateShoppingListInfo())
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

  test('should create the staple template shopping list', (done) => {
    const expectedMasterProductInfo = createStapleTemplateShoppingListInfo();
    let masterProductId;

    StapleTemplateShoppingListService.create(expectedMasterProductInfo)
      .then((id) => {
        masterProductId = id;

        return StapleTemplateShoppingListService.read(masterProductId);
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
  test('should reject if the provided staple template shopping list Id does not exist', (done) => {
    const masterProductId = uuid();

    StapleTemplateShoppingListService.read(masterProductId)
      .catch((error) => {
        expect(error)
          .toBe(`No staple template shopping list found with Id: ${masterProductId}`);
        done();
      });
  });

  test('should read the existing staple template shopping list', (done) => {
    const expectedMasterProductInfo = createStapleTemplateShoppingListInfo();
    let masterProductId;

    StapleTemplateShoppingListService.create(expectedMasterProductInfo)
      .then((id) => {
        masterProductId = id;

        return StapleTemplateShoppingListService.read(masterProductId);
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
  test('should reject if the provided staple template shopping list Id does not exist', (done) => {
    const masterProductId = uuid();

    StapleTemplateShoppingListService.update(createStapleTemplateShoppingListInfo()
        .set('id', masterProductId))
      .catch((error) => {
        expect(error)
          .toBe(`No staple template shopping list found with Id: ${masterProductId}`);
        done();
      });
  });

  test('should return the Id of the updated staple template shopping list', (done) => {
    let masterProductId;

    StapleTemplateShoppingListService.create(createStapleTemplateShoppingListInfo())
      .then((id) => {
        masterProductId = id;

        return StapleTemplateShoppingListService.update(createStapleTemplateShoppingListInfo()
          .set('id', masterProductId));
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

  test('should update the existing staple template shopping list', (done) => {
    const expectedMasterProductInfo = createStapleTemplateShoppingListInfo();
    let masterProductId;

    StapleTemplateShoppingListService.create(createStapleTemplateShoppingListInfo())
      .then(id => StapleTemplateShoppingListService.update(expectedMasterProductInfo.set('id', id)))
      .then((id) => {
        masterProductId = id;

        return StapleTemplateShoppingListService.read(masterProductId);
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
  test('should reject if the provided staple template shopping list Id does not exist', (done) => {
    const masterProductId = uuid();

    StapleTemplateShoppingListService.delete(masterProductId)
      .catch((error) => {
        expect(error)
          .toBe(`No staple template shopping list found with Id: ${masterProductId}`);
        done();
      });
  });

  test('should delete the existing staple template shopping list', (done) => {
    let masterProductId;

    StapleTemplateShoppingListService.create(createStapleTemplateShoppingListInfo())
      .then((id) => {
        masterProductId = id;
        return StapleTemplateShoppingListService.delete(masterProductId);
      })
      .then(() => StapleTemplateShoppingListService.read(masterProductId))
      .catch((error) => {
        expect(error)
          .toBe(`No staple template shopping list found with Id: ${masterProductId}`);
        done();
      });
  });
});

describe('search', () => {
  test('should return no staple template shopping list if provided criteria matches no staple template shopping list', (done) => {
    const result = StapleTemplateShoppingListService.searchAll(createCriteria());
    let masterProducts = List();

    result.event.subscribe((masterProduct) => {
      masterProducts = masterProducts.push(masterProduct);
    });
    result.promise.then(() => {
      expect(masterProducts.size)
          .toBe(0);
      done();
    })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the staple template shopping lists matches the criteria', (done) => {
    const expectedMasterProductInfo = createStapleTemplateShoppingListInfo();
    let masterProductId;

    StapleTemplateShoppingListService.create(expectedMasterProductInfo)
      .then((id) => {
        masterProductId = id;

        return StapleTemplateShoppingListService.search(createCriteriaUsingProvidedMasterProductInfo(expectedMasterProductInfo));
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

describe('searchAll', () => {
  test('should return no staple template shopping list if provided criteria matches no staple template shopping list', (done) => {
    StapleTemplateShoppingListService.search(createCriteria())
      .then((masterProductInfos) => {
        expect(masterProductInfos.size)
          .toBe(0);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the staple template shopping lists matches the criteria', (done) => {
    const expectedMasterProductInfo = createStapleTemplateShoppingListInfo();

    Promise.all([StapleTemplateShoppingListService.create(expectedMasterProductInfo), StapleTemplateShoppingListService.create(
        expectedMasterProductInfo)])
      .then((ids) => {
        const masterProductIds = List.of(ids[0], ids[1]);
        const result = StapleTemplateShoppingListService.searchAll(createCriteriaUsingProvidedMasterProductInfo(expectedMasterProductInfo));
        let masterProducts = List();

        result.event.subscribe((masterProduct) => {
          masterProducts = masterProducts.push(masterProduct);
        });
        result.promise.then(() => {
          expect(masterProducts.size)
              .toBe(masterProductIds.size);
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
  test('should return false if no staple template shopping list match provided criteria', (done) => {
    StapleTemplateShoppingListService.exists(createCriteria())
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

  test('should return true if any staple template shopping list match provided criteria', (done) => {
    const masterProductInfo = createStapleTemplateShoppingListInfo();

    StapleTemplateShoppingListService.create(masterProductInfo)
      .then(() => StapleTemplateShoppingListService.exists(createCriteriaUsingProvidedMasterProductInfo(masterProductInfo)))
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
