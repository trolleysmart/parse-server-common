// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { StapleTemplateService } from '../';
import { createStapleTemplateInfo, expectStapleTemplate } from '../../schema/__tests__/StapleTemplate.test';

const chance = new Chance();
const stapleTemplateService = new StapleTemplateService();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('name', 'description', 'imageUrl'),
  });

const createCriteria = stapleTemplate =>
  Map({
    conditions: Map({
      name: stapleTemplate ? stapleTemplate.get('name') : uuid(),
      description: stapleTemplate ? stapleTemplate.get('description') : uuid(),
      imageUrl: stapleTemplate ? stapleTemplate.get('imageUrl') : uuid(),
    }),
  }).merge(createCriteriaWthoutConditions());

const createStapleTemplates = async (count, useSameInfo = false) => {
  let stapleTemplate;

  if (useSameInfo) {
    const { stapleTemplate: tempStapleTemplate } = await createStapleTemplateInfo();

    stapleTemplate = tempStapleTemplate;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalStapleTemplate;

          if (useSameInfo) {
            finalStapleTemplate = stapleTemplate;
          } else {
            const { stapleTemplate: tempStapleTemplate } = await createStapleTemplateInfo();

            finalStapleTemplate = tempStapleTemplate;
          }

          return stapleTemplateService.read(await stapleTemplateService.create(finalStapleTemplate), createCriteriaWthoutConditions());
        })
        .toArray(),
    ),
  );
};

export default createStapleTemplates;

describe('create', () => {
  test('should return the created staple template Id', async () => {
    const stapleTemplateId = await stapleTemplateService.create((await createStapleTemplateInfo()).stapleTemplate);

    expect(stapleTemplateId).toBeDefined();
  });

  test('should create the staple template', async () => {
    const { stapleTemplate } = await createStapleTemplateInfo();
    const stapleTemplateId = await stapleTemplateService.create(stapleTemplate);
    const fetchedStapleTemplate = await stapleTemplateService.read(stapleTemplateId, createCriteriaWthoutConditions());

    expect(fetchedStapleTemplate).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided staple template Id does not exist', async () => {
    const stapleTemplateId = uuid();

    try {
      await stapleTemplateService.read(stapleTemplateId);
    } catch (ex) {
      expect(ex.message).toBe(`No staple template found with Id: ${stapleTemplateId}`);
    }
  });

  test('should read the existing staple template', async () => {
    const { stapleTemplate: expectedStapleTemplate } = await createStapleTemplateInfo();
    const stapleTemplateId = await stapleTemplateService.create(expectedStapleTemplate);
    const stapleTemplate = await stapleTemplateService.read(stapleTemplateId, createCriteriaWthoutConditions());

    expectStapleTemplate(stapleTemplate, expectedStapleTemplate);
  });
});

describe('update', () => {
  test('should reject if the provided staple template Id does not exist', async () => {
    const stapleTemplateId = uuid();

    try {
      const stapleTemplate = await stapleTemplateService.read(
        await stapleTemplateService.create((await createStapleTemplateInfo()).stapleTemplate),
        createCriteriaWthoutConditions(),
      );

      await stapleTemplateService.update(stapleTemplate.set('id', stapleTemplateId));
    } catch (ex) {
      expect(ex.message).toBe(`No staple template found with Id: ${stapleTemplateId}`);
    }
  });

  test('should return the Id of the updated staple template', async () => {
    const { stapleTemplate: expectedStapleTemplate } = await createStapleTemplateInfo();
    const stapleTemplateId = await stapleTemplateService.create((await createStapleTemplateInfo()).stapleTemplate);
    const id = await stapleTemplateService.update(expectedStapleTemplate.set('id', stapleTemplateId));

    expect(id).toBe(stapleTemplateId);
  });

  test('should update the existing staple template', async () => {
    const { stapleTemplate: expectedStapleTemplate } = await createStapleTemplateInfo();
    const stapleTemplateId = await stapleTemplateService.create((await createStapleTemplateInfo()).stapleTemplate);

    await stapleTemplateService.update(expectedStapleTemplate.set('id', stapleTemplateId));

    const stapleTemplate = await stapleTemplateService.read(stapleTemplateId, createCriteriaWthoutConditions());

    expectStapleTemplate(stapleTemplate, expectedStapleTemplate);
  });
});

describe('delete', () => {
  test('should reject if the provided staple template Id does not exist', async () => {
    const stapleTemplateId = uuid();

    try {
      await stapleTemplateService.delete(stapleTemplateId);
    } catch (ex) {
      expect(ex.message).toBe(`No staple template found with Id: ${stapleTemplateId}`);
    }
  });

  test('should delete the existing staple template', async () => {
    const stapleTemplateId = await stapleTemplateService.create((await createStapleTemplateInfo()).stapleTemplate);
    await stapleTemplateService.delete(stapleTemplateId);

    try {
      await stapleTemplateService.delete(stapleTemplateId);
    } catch (ex) {
      expect(ex.message).toBe(`No staple template found with Id: ${stapleTemplateId}`);
    }
  });
});

describe('search', () => {
  test('should return no staple template if provided criteria matches no staple template', async () => {
    const stapleTemplates = await stapleTemplateService.search(createCriteria());

    expect(stapleTemplates.count()).toBe(0);
  });

  test('should return the staple template matches the criteria', async () => {
    const { stapleTemplate: expectedStapleTemplate } = await createStapleTemplateInfo();
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 }))
          .map(async () => stapleTemplateService.create(expectedStapleTemplate))
          .toArray(),
      ),
    );
    const stapleTemplates = await stapleTemplateService.search(createCriteria(expectedStapleTemplate));

    expect(stapleTemplates.count).toBe(results.count);
    stapleTemplates.forEach((stapleTemplate) => {
      expect(results.find(_ => _.localeCompare(stapleTemplate.get('id')) === 0)).toBeDefined();
      expectStapleTemplate(stapleTemplate, expectedStapleTemplate);
    });
  });
});

describe('searchAll', () => {
  test('should return no staple template if provided criteria matches no staple template', async () => {
    let stapleTemplates = List();
    const result = stapleTemplateService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        stapleTemplates = stapleTemplates.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(stapleTemplates.count()).toBe(0);
  });

  test('should return the staple template matches the criteria', async () => {
    const { stapleTemplate: expectedStapleTemplate } = await createStapleTemplateInfo();
    const results = Immutable.fromJS(
      await Promise.all(
        Range(0, chance.integer({ min: 2, max: 5 }))
          .map(async () => stapleTemplateService.create(expectedStapleTemplate))
          .toArray(),
      ),
    );

    let stapleTemplates = List();
    const result = stapleTemplateService.searchAll(createCriteria(expectedStapleTemplate));

    try {
      result.event.subscribe((info) => {
        stapleTemplates = stapleTemplates.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(stapleTemplates.count).toBe(results.count);
    stapleTemplates.forEach((stapleTemplate) => {
      expect(results.find(_ => _.localeCompare(stapleTemplate.get('id')) === 0)).toBeDefined();
      expectStapleTemplate(stapleTemplate, expectedStapleTemplate);
    });
  });
});

describe('exists', () => {
  test('should return false if no staple template match provided criteria', async () => {
    expect(await stapleTemplateService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any staple template match provided criteria', async () => {
    const stapleTemplates = await createStapleTemplates(chance.integer({ min: 1, max: 10 }), true);

    expect(await stapleTemplateService.exists(createCriteria(stapleTemplates.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no staple template match provided criteria', async () => {
    expect(await stapleTemplateService.count(createCriteria())).toBe(0);
  });

  test('should return the count of staple template match provided criteria', async () => {
    const stapleTemplates = await createStapleTemplates(chance.integer({ min: 1, max: 10 }), true);

    expect(await stapleTemplateService.count(createCriteria(stapleTemplates.first()))).toBe(stapleTemplates.count());
  });
});
