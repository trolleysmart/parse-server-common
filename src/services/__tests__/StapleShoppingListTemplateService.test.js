// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StapleShoppingListTemplateService } from '../';
import { createStapleShoppingListTemplateInfo, expectStapleShoppingListTemplate } from '../../schema/__tests__/StapleShoppingListTemplate.test';

const chance = new Chance();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('name', 'description', 'imageUrl'),
  });

const createCriteria = stapleShoppingListTemplate =>
  Map({
    conditions: Map({
      name: stapleShoppingListTemplate ? stapleShoppingListTemplate.get('name') : uuid(),
      description: stapleShoppingListTemplate ? stapleShoppingListTemplate.get('description') : uuid(),
      imageUrl: stapleShoppingListTemplate ? stapleShoppingListTemplate.get('imageUrl') : uuid(),
    }),
  }).merge(createCriteriaWthoutConditions());

const createStapleShoppingListTemplates = async (count, useSameInfo = false) => {
  let stapleShoppingListTemplate;

  if (useSameInfo) {
    const { stapleShoppingListTemplate: tempStapleShoppingListTemplate } = await createStapleShoppingListTemplateInfo();

    stapleShoppingListTemplate = tempStapleShoppingListTemplate;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalStapleShoppingListTemplate;

          if (useSameInfo) {
            finalStapleShoppingListTemplate = stapleShoppingListTemplate;
          } else {
            const { stapleShoppingListTemplate: tempStapleShoppingListTemplate } = await createStapleShoppingListTemplateInfo();

            finalStapleShoppingListTemplate = tempStapleShoppingListTemplate;
          }

          return StapleShoppingListTemplateService.read(
            await StapleShoppingListTemplateService.create(finalStapleShoppingListTemplate),
            createCriteriaWthoutConditions(),
          );
        })
        .toArray(),
    ),
  );
};

export default createStapleShoppingListTemplates;

describe('create', () => {
  test('should return the created staple shopping list template Id', async () => {
    const stapleShoppingListTemplateId = await StapleShoppingListTemplateService.create(
      (await createStapleShoppingListTemplateInfo()).stapleShoppingListTemplate,
    );

    expect(stapleShoppingListTemplateId).toBeDefined();
  });

  test('should create the staple shopping list template', async () => {
    const { stapleShoppingListTemplate } = await createStapleShoppingListTemplateInfo();
    const stapleShoppingListTemplateId = await StapleShoppingListTemplateService.create(stapleShoppingListTemplate);
    const fetchedStapleShoppingListTemplate = await StapleShoppingListTemplateService.read(
      stapleShoppingListTemplateId,
      createCriteriaWthoutConditions(),
    );

    expect(fetchedStapleShoppingListTemplate).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided staple shopping list template Id does not exist', async () => {
    const stapleShoppingListTemplateId = uuid();

    try {
      await StapleShoppingListTemplateService.read(stapleShoppingListTemplateId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list template found with Id: ${stapleShoppingListTemplateId}`);
    }
  });

  test('should read the existing staple shopping list template', async () => {
    const { stapleShoppingListTemplate: expectedStapleShoppingListTemplate } = await createStapleShoppingListTemplateInfo();
    const stapleShoppingListTemplateId = await StapleShoppingListTemplateService.create(expectedStapleShoppingListTemplate);
    const stapleShoppingListTemplate = await StapleShoppingListTemplateService.read(stapleShoppingListTemplateId, createCriteriaWthoutConditions());

    expectStapleShoppingListTemplate(stapleShoppingListTemplate, expectedStapleShoppingListTemplate);
  });
});

describe('update', () => {
  test('should reject if the provided staple shopping list template Id does not exist', async () => {
    const stapleShoppingListTemplateId = uuid();

    try {
      const stapleShoppingListTemplate = await StapleShoppingListTemplateService.read(
        await StapleShoppingListTemplateService.create((await createStapleShoppingListTemplateInfo()).stapleShoppingListTemplate),
        createCriteriaWthoutConditions(),
      );

      await StapleShoppingListTemplateService.update(stapleShoppingListTemplate.set('id', stapleShoppingListTemplateId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list template found with Id: ${stapleShoppingListTemplateId}`);
    }
  });

  test('should return the Id of the updated staple shopping list template', async () => {
    const { stapleShoppingListTemplate: expectedStapleShoppingListTemplate } = await createStapleShoppingListTemplateInfo();
    const stapleShoppingListTemplateId = await StapleShoppingListTemplateService.create(
      (await createStapleShoppingListTemplateInfo()).stapleShoppingListTemplate,
    );
    const id = await StapleShoppingListTemplateService.update(expectedStapleShoppingListTemplate.set('id', stapleShoppingListTemplateId));

    expect(id).toBe(stapleShoppingListTemplateId);
  });

  test('should update the existing staple shopping list template', async () => {
    const { stapleShoppingListTemplate: expectedStapleShoppingListTemplate } = await createStapleShoppingListTemplateInfo();
    const stapleShoppingListTemplateId = await StapleShoppingListTemplateService.create(
      (await createStapleShoppingListTemplateInfo()).stapleShoppingListTemplate,
    );

    await StapleShoppingListTemplateService.update(expectedStapleShoppingListTemplate.set('id', stapleShoppingListTemplateId));

    const stapleShoppingListTemplate = await StapleShoppingListTemplateService.read(stapleShoppingListTemplateId, createCriteriaWthoutConditions());

    expectStapleShoppingListTemplate(stapleShoppingListTemplate, expectedStapleShoppingListTemplate);
  });
});

describe('delete', () => {
  test('should reject if the provided staple shopping list template Id does not exist', async () => {
    const stapleShoppingListTemplateId = uuid();

    try {
      await StapleShoppingListTemplateService.delete(stapleShoppingListTemplateId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list template found with Id: ${stapleShoppingListTemplateId}`);
    }
  });

  test('should delete the existing staple shopping list template', async () => {
    const stapleShoppingListTemplateId = await StapleShoppingListTemplateService.create(
      (await createStapleShoppingListTemplateInfo()).stapleShoppingListTemplate,
    );
    await StapleShoppingListTemplateService.delete(stapleShoppingListTemplateId);

    try {
      await StapleShoppingListTemplateService.delete(stapleShoppingListTemplateId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list template found with Id: ${stapleShoppingListTemplateId}`);
    }
  });
});

describe('search', () => {
  test('should return no staple shopping list template if provided criteria matches no staple shopping list template', async () => {
    const stapleShoppingListTemplates = await StapleShoppingListTemplateService.search(createCriteria());

    expect(stapleShoppingListTemplates.count()).toBe(0);
  });

  test('should return the staple shopping list template matches the criteria', async () => {
    const { stapleShoppingListTemplate: expectedStapleShoppingListTemplate } = await createStapleShoppingListTemplateInfo();
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 }))
          .map(async () => StapleShoppingListTemplateService.create(expectedStapleShoppingListTemplate))
          .toArray(),
      ),
    );
    const stapleShoppingListTemplates = await StapleShoppingListTemplateService.search(createCriteria(expectedStapleShoppingListTemplate));

    expect(stapleShoppingListTemplates.count).toBe(results.count);
    stapleShoppingListTemplates.forEach((stapleShoppingListTemplate) => {
      expect(results.find(_ => _.localeCompare(stapleShoppingListTemplate.get('id')) === 0)).toBeDefined();
      expectStapleShoppingListTemplate(stapleShoppingListTemplate, expectedStapleShoppingListTemplate);
    });
  });
});

describe('searchAll', () => {
  test('should return no staple shopping list template if provided criteria matches no staple shopping list template', async () => {
    let stapleShoppingListTemplates = List();
    const result = StapleShoppingListTemplateService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        stapleShoppingListTemplates = stapleShoppingListTemplates.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(stapleShoppingListTemplates.count()).toBe(0);
  });

  test('should return the staple shopping list template matches the criteria', async () => {
    const { stapleShoppingListTemplate: expectedStapleShoppingListTemplate } = await createStapleShoppingListTemplateInfo();
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 }))
          .map(async () => StapleShoppingListTemplateService.create(expectedStapleShoppingListTemplate))
          .toArray(),
      ),
    );

    let stapleShoppingListTemplates = List();
    const result = StapleShoppingListTemplateService.searchAll(createCriteria(expectedStapleShoppingListTemplate));

    try {
      result.event.subscribe((info) => {
        stapleShoppingListTemplates = stapleShoppingListTemplates.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(stapleShoppingListTemplates.count).toBe(results.count);
    stapleShoppingListTemplates.forEach((stapleShoppingListTemplate) => {
      expect(results.find(_ => _.localeCompare(stapleShoppingListTemplate.get('id')) === 0)).toBeDefined();
      expectStapleShoppingListTemplate(stapleShoppingListTemplate, expectedStapleShoppingListTemplate);
    });
  });
});

describe('exists', () => {
  test('should return false if no staple shopping list template match provided criteria', async () => {
    expect(await StapleShoppingListTemplateService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any staple shopping list template match provided criteria', async () => {
    const stapleShoppingListTemplates = await createStapleShoppingListTemplates(chance.integer({ min: 1, max: 10 }), true);

    expect(await StapleShoppingListTemplateService.exists(createCriteria(stapleShoppingListTemplates.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no staple shopping list template match provided criteria', async () => {
    expect(await StapleShoppingListTemplateService.count(createCriteria())).toBe(0);
  });

  test('should return the count of staple shopping list template match provided criteria', async () => {
    const stapleShoppingListTemplates = await createStapleShoppingListTemplates(chance.integer({ min: 1, max: 10 }), true);

    expect(await StapleShoppingListTemplateService.count(createCriteria(stapleShoppingListTemplates.first()))).toBe(
      stapleShoppingListTemplates.count(),
    );
  });
});
