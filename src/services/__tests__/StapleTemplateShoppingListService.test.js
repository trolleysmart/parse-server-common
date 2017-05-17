// @flow

import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StapleTemplateShoppingListService } from '../';
import { createStapleTemplateShoppingListInfo } from '../../schema/__tests__/StapleTemplateShoppingList.test';
import { createStapleTemplateInfo } from '../../schema/__tests__/StapleTemplate.test';
import { StapleTemplate } from '../../schema';

function expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId) {
  expect(stapleTemplateShoppingListInfo.get('id')).toBe(stapleTemplateShoppingListId);
  expect(stapleTemplateShoppingListInfo.get('description')).toBe(expectedStapleTemplateShoppingListInfo.get('description'));
  expect(stapleTemplateShoppingListInfo.get('stapleTemplateIds')).toEqual(expectedStapleTemplateShoppingListInfo.get('stapleTemplateIds'));
}

export function createCriteria() {
  return Map({
    fields: List.of('description', 'stapleTemplates'),
    includeStapleTemplates: true,
    conditions: Map({
      description: uuid(),
    }),
  });
}

export function createCriteriaUsingProvidedStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo) {
  return Map({
    fields: List.of('description', 'stapleTemplates'),
    includeStapleTemplates: true,
    conditions: Map({
      description: stapleTemplateShoppingListInfo.get('description'),
      stapleTemplates: stapleTemplateShoppingListInfo.get('stapleTemplates'),
    }),
  });
}

describe('create', () => {
  test('should return the created staple template shopping list Id', (done) => {
    StapleTemplateShoppingListService.create(createStapleTemplateShoppingListInfo())
      .then((result) => {
        expect(result).toBeDefined();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should create the staple template shopping list', (done) => {
    let expectedStapleTemplateShoppingListInfo;
    let stapleTemplateShoppingListId;

    Promise.all([StapleTemplate.spawn(createStapleTemplateInfo()).save(), StapleTemplate.spawn(createStapleTemplateInfo()).save()])
      .then((results) => {
        expectedStapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo(List.of(results[0].id, results[1].id));

        return StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo);
      })
      .then((id) => {
        stapleTemplateShoppingListId = id;

        return StapleTemplateShoppingListService.read(stapleTemplateShoppingListId);
      })
      .then((stapleTemplateShoppingListInfo) => {
        expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId);
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
    const stapleTemplateShoppingListId = uuid();

    StapleTemplateShoppingListService.read(stapleTemplateShoppingListId).catch((error) => {
      expect(error).toBe(`No staple template shopping list found with Id: ${stapleTemplateShoppingListId}`);
      done();
    });
  });

  test('should read the existing staple template shopping list', (done) => {
    let expectedStapleTemplateShoppingListInfo;
    let stapleTemplateShoppingListId;

    Promise.all([StapleTemplate.spawn(createStapleTemplateInfo()).save(), StapleTemplate.spawn(createStapleTemplateInfo()).save()])
      .then((results) => {
        expectedStapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo(List.of(results[0].id, results[1].id));

        return StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo);
      })
      .then((id) => {
        stapleTemplateShoppingListId = id;

        return StapleTemplateShoppingListService.read(stapleTemplateShoppingListId);
      })
      .then((stapleTemplateShoppingListInfo) => {
        expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId);
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
    const stapleTemplateShoppingListId = uuid();

    StapleTemplateShoppingListService.update(createStapleTemplateShoppingListInfo().set('id', stapleTemplateShoppingListId)).catch((error) => {
      expect(error).toBe(`No staple template shopping list found with Id: ${stapleTemplateShoppingListId}`);
      done();
    });
  });

  test('should return the Id of the updated staple template shopping list', (done) => {
    let stapleTemplateShoppingListId;

    StapleTemplateShoppingListService.create(createStapleTemplateShoppingListInfo())
      .then((id) => {
        stapleTemplateShoppingListId = id;

        return StapleTemplateShoppingListService.update(createStapleTemplateShoppingListInfo().set('id', stapleTemplateShoppingListId));
      })
      .then((id) => {
        expect(id).toBe(stapleTemplateShoppingListId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should update the existing staple template shopping list', (done) => {
    let expectedStapleTemplateShoppingListInfo;
    let stapleTemplateShoppingListId;

    Promise.all([
      StapleTemplate.spawn(createStapleTemplateInfo()).save(),
      StapleTemplate.spawn(createStapleTemplateInfo()).save(),
      StapleTemplateShoppingListService.create(createStapleTemplateShoppingListInfo()),
    ])
      .then((results) => {
        expectedStapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo(List.of(results[0].id, results[1].id));

        return StapleTemplateShoppingListService.update(expectedStapleTemplateShoppingListInfo.set('id', results[2]));
      })
      .then((id) => {
        stapleTemplateShoppingListId = id;

        return StapleTemplateShoppingListService.read(stapleTemplateShoppingListId);
      })
      .then((stapleTemplateShoppingListInfo) => {
        expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId);
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
    const stapleTemplateShoppingListId = uuid();

    StapleTemplateShoppingListService.delete(stapleTemplateShoppingListId).catch((error) => {
      expect(error).toBe(`No staple template shopping list found with Id: ${stapleTemplateShoppingListId}`);
      done();
    });
  });

  test('should delete the existing staple template shopping list', (done) => {
    let stapleTemplateShoppingListId;

    StapleTemplateShoppingListService.create(createStapleTemplateShoppingListInfo())
      .then((id) => {
        stapleTemplateShoppingListId = id;
        return StapleTemplateShoppingListService.delete(stapleTemplateShoppingListId);
      })
      .then(() => StapleTemplateShoppingListService.read(stapleTemplateShoppingListId))
      .catch((error) => {
        expect(error).toBe(`No staple template shopping list found with Id: ${stapleTemplateShoppingListId}`);
        done();
      });
  });
});

describe('search', () => {
  test('should return no staple template shopping list if provided criteria matches no staple template shopping list', (done) => {
    StapleTemplateShoppingListService.search(createCriteria())
      .then((stapleTemplateShoppingListInfos) => {
        expect(stapleTemplateShoppingListInfos.size).toBe(0);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the staple template shopping lists matches the criteria', (done) => {
    let expectedStapleTemplateShoppingListInfo;
    let stapleTemplateShoppingListId;

    Promise.all([StapleTemplate.spawn(createStapleTemplateInfo()).save(), StapleTemplate.spawn(createStapleTemplateInfo()).save()])
      .then((results) => {
        expectedStapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo(List.of(results[0].id, results[1].id));

        return StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo);
      })
      .then((id) => {
        stapleTemplateShoppingListId = id;

        return StapleTemplateShoppingListService.search(
          createCriteriaUsingProvidedStapleTemplateShoppingListInfo(expectedStapleTemplateShoppingListInfo),
        );
      })
      .then((stapleTemplateShoppingListInfos) => {
        expect(stapleTemplateShoppingListInfos.size).toBe(1);

        const stapleTemplateShoppingListInfo = stapleTemplateShoppingListInfos.first();
        expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId);
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
    const result = StapleTemplateShoppingListService.searchAll(createCriteria());
    let stapleTemplateShoppingLists = List();

    result.event.subscribe((stapleTemplateShoppingList) => {
      stapleTemplateShoppingLists = stapleTemplateShoppingLists.push(stapleTemplateShoppingList);
    });
    result.promise
      .then(() => {
        result.event.unsubscribeAll();
        expect(stapleTemplateShoppingLists.size).toBe(0);
        done();
      })
      .catch((error) => {
        result.event.unsubscribeAll();
        fail(error);
        done();
      });
  });

  test('should return the staple template shopping lists matches the criteria', (done) => {
    const expectedStapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo();

    Promise.all([
      StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo),
      StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo),
    ])
      .then((ids) => {
        const stapleTemplateShoppingListIds = List.of(ids[0], ids[1]);
        const result = StapleTemplateShoppingListService.searchAll(
          createCriteriaUsingProvidedStapleTemplateShoppingListInfo(expectedStapleTemplateShoppingListInfo),
        );
        let stapleTemplateShoppingLists = List();

        result.event.subscribe((stapleTemplateShoppingList) => {
          stapleTemplateShoppingLists = stapleTemplateShoppingLists.push(stapleTemplateShoppingList);
        });
        result.promise
          .then(() => {
            result.event.unsubscribeAll();
            expect(stapleTemplateShoppingLists.size).toBe(stapleTemplateShoppingListIds.size);
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
  test('should return false if no staple template shopping list match provided criteria', (done) => {
    StapleTemplateShoppingListService.exists(createCriteria())
      .then((response) => {
        expect(response).toBeFalsy();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return true if any staple template shopping list match provided criteria', (done) => {
    const stapleTemplateShoppingListInfo = createStapleTemplateShoppingListInfo();

    StapleTemplateShoppingListService.create(stapleTemplateShoppingListInfo)
      .then(() => StapleTemplateShoppingListService.exists(createCriteriaUsingProvidedStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo)))
      .then((response) => {
        expect(response).toBeTruthy();
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});
