// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StapleShoppingListDetailsTemplateService } from '../';
import {
  createStapleShoppingListDetailsTemplateInfo,
  expectStapleShoppingListDetailsTemplate,
} from '../../schema/__tests__/StapleShoppingListDetailsTemplate.test';

const chance = new Chance();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('name', 'description', 'imageUrl', 'stapleShoppingListTemplates', 'tags'),
    includeStapleShoppingListTemplates: true,
    includeTags: true,
  });

const createCriteria = stapleShoppingListDetailsTemplate =>
  Map({
    conditions: Map({
      name: stapleShoppingListDetailsTemplate ? stapleShoppingListDetailsTemplate.get('name') : uuid(),
      description: stapleShoppingListDetailsTemplate ? stapleShoppingListDetailsTemplate.get('description') : uuid(),
      imageUrl: stapleShoppingListDetailsTemplate ? stapleShoppingListDetailsTemplate.get('imageUrl') : uuid(),
      stapleShoppingListTemplateIds: stapleShoppingListDetailsTemplate
        ? stapleShoppingListDetailsTemplate.get('stapleShoppingListTemplateIds')
        : List.of(uuid(), uuid()),
      tagIds: stapleShoppingListDetailsTemplate ? stapleShoppingListDetailsTemplate.get('tagIds') : List.of(uuid(), uuid()),
    }),
  }).merge(createCriteriaWthoutConditions());

const createStapleShoppingListDetailsTemplates = async (count, useSameInfo = false) => {
  let stapleShoppingListDetailsTemplate;

  if (useSameInfo) {
    const { stapleShoppingListDetailsTemplate: tempStapleShoppingListDetailsTemplate } = await createStapleShoppingListDetailsTemplateInfo();

    stapleShoppingListDetailsTemplate = tempStapleShoppingListDetailsTemplate;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalStapleShoppingListDetailsTemplate;

          if (useSameInfo) {
            finalStapleShoppingListDetailsTemplate = stapleShoppingListDetailsTemplate;
          } else {
            const { stapleShoppingListDetailsTemplate: tempStapleShoppingListDetailsTemplate } = await createStapleShoppingListDetailsTemplateInfo();

            finalStapleShoppingListDetailsTemplate = tempStapleShoppingListDetailsTemplate;
          }

          return StapleShoppingListDetailsTemplateService.read(
            await StapleShoppingListDetailsTemplateService.create(finalStapleShoppingListDetailsTemplate),
            createCriteriaWthoutConditions(),
          );
        })
        .toArray(),
    ),
  );
};

export default createStapleShoppingListDetailsTemplates;

describe('create', () => {
  test('should return the created staple shopping list details template Id', async () => {
    const stapleShoppingListDetailsTemplateId = await StapleShoppingListDetailsTemplateService.create(
      (await createStapleShoppingListDetailsTemplateInfo()).stapleShoppingListDetailsTemplate,
    );

    expect(stapleShoppingListDetailsTemplateId).toBeDefined();
  });

  test('should create the staple shopping list details template', async () => {
    const { stapleShoppingListDetailsTemplate } = await createStapleShoppingListDetailsTemplateInfo();
    const stapleShoppingListDetailsTemplateId = await StapleShoppingListDetailsTemplateService.create(stapleShoppingListDetailsTemplate);
    const fetchedStapleShoppingListDetailsTemplate = await StapleShoppingListDetailsTemplateService.read(
      stapleShoppingListDetailsTemplateId,
      createCriteriaWthoutConditions(),
    );

    expect(fetchedStapleShoppingListDetailsTemplate).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided staple shopping list details template Id does not exist', async () => {
    const stapleShoppingListDetailsTemplateId = uuid();

    try {
      await StapleShoppingListDetailsTemplateService.read(stapleShoppingListDetailsTemplateId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list details template found with Id: ${stapleShoppingListDetailsTemplateId}`);
    }
  });

  test('should read the existing staple shopping list details template', async () => {
    const {
      stapleShoppingListDetailsTemplate: expectedStapleShoppingListDetailsTemplate,
      stapleShoppingListTemplates: expectedStapleShoppingListTemplates,
      tags: expectedTags,
    } = await createStapleShoppingListDetailsTemplateInfo();
    const stapleShoppingListDetailsTemplateId = await StapleShoppingListDetailsTemplateService.create(expectedStapleShoppingListDetailsTemplate);
    const stapleShoppingListDetailsTemplate = await StapleShoppingListDetailsTemplateService.read(
      stapleShoppingListDetailsTemplateId,
      createCriteriaWthoutConditions(),
    );

    expectStapleShoppingListDetailsTemplate(stapleShoppingListDetailsTemplate, expectedStapleShoppingListDetailsTemplate, {
      stapleShoppingListDetailsTemplateId,
      expectedStapleShoppingListTemplates,
      expectedTags,
    });
  });
});

describe('update', () => {
  test('should reject if the provided staple shopping list details template Id does not exist', async () => {
    const stapleShoppingListDetailsTemplateId = uuid();

    try {
      const stapleShoppingListDetailsTemplate = await StapleShoppingListDetailsTemplateService.read(
        await StapleShoppingListDetailsTemplateService.create(
          (await createStapleShoppingListDetailsTemplateInfo()).stapleShoppingListDetailsTemplate,
        ),
        createCriteriaWthoutConditions(),
      );

      await StapleShoppingListDetailsTemplateService.update(stapleShoppingListDetailsTemplate.set('id', stapleShoppingListDetailsTemplateId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list details template found with Id: ${stapleShoppingListDetailsTemplateId}`);
    }
  });

  test('should return the Id of the updated staple shopping list details template', async () => {
    const { stapleShoppingListDetailsTemplate: expectedStapleShoppingListDetailsTemplate } = await createStapleShoppingListDetailsTemplateInfo();
    const stapleShoppingListDetailsTemplateId = await StapleShoppingListDetailsTemplateService.create(
      (await createStapleShoppingListDetailsTemplateInfo()).stapleShoppingListDetailsTemplate,
    );
    const id = await StapleShoppingListDetailsTemplateService.update(
      expectedStapleShoppingListDetailsTemplate.set('id', stapleShoppingListDetailsTemplateId),
    );

    expect(id).toBe(stapleShoppingListDetailsTemplateId);
  });

  test('should update the existing staple shopping list details template', async () => {
    const {
      stapleShoppingListDetailsTemplate: expectedStapleShoppingListDetailsTemplate,
      stapleShoppingListTemplates: expectedStapleShoppingListTemplates,
      tags: expectedTags,
    } = await createStapleShoppingListDetailsTemplateInfo();
    const stapleShoppingListDetailsTemplateId = await StapleShoppingListDetailsTemplateService.create(
      (await createStapleShoppingListDetailsTemplateInfo()).stapleShoppingListDetailsTemplate,
    );

    await StapleShoppingListDetailsTemplateService.update(expectedStapleShoppingListDetailsTemplate.set('id', stapleShoppingListDetailsTemplateId));

    const stapleShoppingListDetailsTemplate = await StapleShoppingListDetailsTemplateService.read(
      stapleShoppingListDetailsTemplateId,
      createCriteriaWthoutConditions(),
    );

    expectStapleShoppingListDetailsTemplate(stapleShoppingListDetailsTemplate, expectedStapleShoppingListDetailsTemplate, {
      stapleShoppingListDetailsTemplateId,
      expectedStapleShoppingListTemplates,
      expectedTags,
    });
  });
});

describe('delete', () => {
  test('should reject if the provided staple shopping list details template Id does not exist', async () => {
    const stapleShoppingListDetailsTemplateId = uuid();

    try {
      await StapleShoppingListDetailsTemplateService.delete(stapleShoppingListDetailsTemplateId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list details template found with Id: ${stapleShoppingListDetailsTemplateId}`);
    }
  });

  test('should delete the existing staple shopping list details template', async () => {
    const stapleShoppingListDetailsTemplateId = await StapleShoppingListDetailsTemplateService.create(
      (await createStapleShoppingListDetailsTemplateInfo()).stapleShoppingListDetailsTemplate,
    );
    await StapleShoppingListDetailsTemplateService.delete(stapleShoppingListDetailsTemplateId);

    try {
      await StapleShoppingListDetailsTemplateService.delete(stapleShoppingListDetailsTemplateId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No staple shopping list details template found with Id: ${stapleShoppingListDetailsTemplateId}`);
    }
  });
});

describe('search', () => {
  test('should return no staple shopping list details template if provided criteria matches no staple shopping list details template', async () => {
    const stapleShoppingListDetailsTemplates = await StapleShoppingListDetailsTemplateService.search(createCriteria());

    expect(stapleShoppingListDetailsTemplates.count()).toBe(0);
  });

  test('should return the staple shopping list details template matches the criteria', async () => {
    const {
      stapleShoppingListDetailsTemplate: expectedStapleShoppingListDetailsTemplate,
      stapleShoppingListTemplates: expectedStapleShoppingListTemplates,
      tags: expectedTags,
    } = await createStapleShoppingListDetailsTemplateInfo();
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 }))
          .map(async () => StapleShoppingListDetailsTemplateService.create(expectedStapleShoppingListDetailsTemplate))
          .toArray(),
      ),
    );
    const stapleShoppingListDetailsTemplates = await StapleShoppingListDetailsTemplateService.search(
      createCriteria(expectedStapleShoppingListDetailsTemplate),
    );

    expect(stapleShoppingListDetailsTemplates.count).toBe(results.count);
    stapleShoppingListDetailsTemplates.forEach((stapleShoppingListDetailsTemplate) => {
      expect(results.find(_ => _.localeCompare(stapleShoppingListDetailsTemplate.get('id')) === 0)).toBeDefined();
      expectStapleShoppingListDetailsTemplate(stapleShoppingListDetailsTemplate, expectedStapleShoppingListDetailsTemplate, {
        stapleShoppingListDetailsTemplateId: stapleShoppingListDetailsTemplate.get('id'),
        expectedStapleShoppingListTemplates,
        expectedTags,
      });
    });
  });
});

describe('searchAll', () => {
  test('should return no staple shopping list details template if provided criteria matches no staple shopping list details template', async () => {
    let stapleShoppingListDetailsTemplates = List();
    const result = StapleShoppingListDetailsTemplateService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        stapleShoppingListDetailsTemplates = stapleShoppingListDetailsTemplates.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(stapleShoppingListDetailsTemplates.count()).toBe(0);
  });

  test('should return the staple shopping list details template matches the criteria', async () => {
    const {
      stapleShoppingListDetailsTemplate: expectedStapleShoppingListDetailsTemplate,
      stapleShoppingListTemplates: expectedStapleShoppingListTemplates,
      tags: expectedTags,
    } = await createStapleShoppingListDetailsTemplateInfo();
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 }))
          .map(async () => StapleShoppingListDetailsTemplateService.create(expectedStapleShoppingListDetailsTemplate))
          .toArray(),
      ),
    );

    let stapleShoppingListDetailsTemplates = List();
    const result = StapleShoppingListDetailsTemplateService.searchAll(createCriteria(expectedStapleShoppingListDetailsTemplate));

    try {
      result.event.subscribe((info) => {
        stapleShoppingListDetailsTemplates = stapleShoppingListDetailsTemplates.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(stapleShoppingListDetailsTemplates.count).toBe(results.count);
    stapleShoppingListDetailsTemplates.forEach((stapleShoppingListDetailsTemplate) => {
      expect(results.find(_ => _.localeCompare(stapleShoppingListDetailsTemplate.get('id')) === 0)).toBeDefined();
      expectStapleShoppingListDetailsTemplate(stapleShoppingListDetailsTemplate, expectedStapleShoppingListDetailsTemplate, {
        stapleShoppingListDetailsTemplateId: stapleShoppingListDetailsTemplate.get('id'),
        expectedStapleShoppingListTemplates,
        expectedTags,
      });
    });
  });
});

describe('exists', () => {
  test('should return false if no staple shopping list details template match provided criteria', async () => {
    expect(await StapleShoppingListDetailsTemplateService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any staple shopping list details template match provided criteria', async () => {
    const stapleShoppingListDetailsTemplates = await createStapleShoppingListDetailsTemplates(chance.integer({ min: 1, max: 10 }), true);

    expect(await StapleShoppingListDetailsTemplateService.exists(createCriteria(stapleShoppingListDetailsTemplates.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no staple shopping list details template match provided criteria', async () => {
    expect(await StapleShoppingListDetailsTemplateService.count(createCriteria())).toBe(0);
  });

  test('should return the count of staple shopping list details template match provided criteria', async () => {
    const stapleShoppingListDetailsTemplates = await createStapleShoppingListDetailsTemplates(chance.integer({ min: 1, max: 10 }), true);

    expect(await StapleShoppingListDetailsTemplateService.count(createCriteria(stapleShoppingListDetailsTemplates.first()))).toBe(
      stapleShoppingListDetailsTemplates.count(),
    );
  });
});
