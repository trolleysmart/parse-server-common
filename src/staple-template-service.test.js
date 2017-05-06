import {
  List,
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import '../bootstrap';
import StapleTemplateService from './staple-template-service';
import {
  createStapleTemplateInfo,
} from './schema/staple-template.test';

function expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId) {
  expect(stapleTemplateInfo.get('id'))
    .toBe(stapleTemplateId);
  expect(stapleTemplateInfo.get('name'))
    .toBe(expectedStapleTemplateInfo.get('name'));
}

function createCriteria() {
  return Map({
    fields: List.of('name'),
    conditions: Map({
      name: uuid(),
    }),
  });
}

function createCriteriaUsingProvidedStapleTemplateInfo(stapleTemplateInfo) {
  return Map({
    fields: List.of('name'),
    conditions: Map({
      name: stapleTemplateInfo.get('name'),
    }),
  });
}

describe('create', () => {
  test('should return the created staple template Id', (done) => {
    StapleTemplateService.create(createStapleTemplateInfo())
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

  test('should create the stapleTemplate', (done) => {
    const expectedStapleTemplateInfo = createStapleTemplateInfo();
    let stapleTemplateId;

    StapleTemplateService.create(expectedStapleTemplateInfo)
      .then((id) => {
        stapleTemplateId = id;

        return StapleTemplateService.read(stapleTemplateId);
      })
      .then((stapleTemplateInfo) => {
        expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('read', () => {
  test('should reject if the provided staple template Id does not exist', (done) => {
    const stapleTemplateId = uuid();

    StapleTemplateService.read(stapleTemplateId)
      .catch((error) => {
        expect(error)
          .toBe(`No staple template found with Id: ${stapleTemplateId}`);
        done();
      });
  });

  test('should read the existing stapleTemplate', (done) => {
    const expectedStapleTemplateInfo = createStapleTemplateInfo();
    let stapleTemplateId;

    StapleTemplateService.create(expectedStapleTemplateInfo)
      .then((id) => {
        stapleTemplateId = id;

        return StapleTemplateService.read(stapleTemplateId);
      })
      .then((stapleTemplateInfo) => {
        expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('update', () => {
  test('should reject if the provided staple template Id does not exist', (done) => {
    const stapleTemplateId = uuid();

    StapleTemplateService.update(createStapleTemplateInfo()
        .set('id', stapleTemplateId))
      .catch((error) => {
        expect(error)
          .toBe(`No staple template found with Id: ${stapleTemplateId}`);
        done();
      });
  });

  test('should return the Id of the updated stapleTemplate', (done) => {
    let stapleTemplateId;

    StapleTemplateService.create(createStapleTemplateInfo())
      .then((id) => {
        stapleTemplateId = id;

        return StapleTemplateService.update(createStapleTemplateInfo()
          .set('id', stapleTemplateId));
      })
      .then((id) => {
        expect(id)
          .toBe(stapleTemplateId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should update the existing stapleTemplate', (done) => {
    const expectedStapleTemplateInfo = createStapleTemplateInfo();
    let stapleTemplateId;

    StapleTemplateService.create(createStapleTemplateInfo())
      .then(id => StapleTemplateService.update(expectedStapleTemplateInfo.set('id', id)))
      .then((id) => {
        stapleTemplateId = id;

        return StapleTemplateService.read(stapleTemplateId);
      })
      .then((stapleTemplateInfo) => {
        expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('delete', () => {
  test('should reject if the provided staple template Id does not exist', (done) => {
    const stapleTemplateId = uuid();

    StapleTemplateService.delete(stapleTemplateId)
      .catch((error) => {
        expect(error)
          .toBe(`No staple template found with Id: ${stapleTemplateId}`);
        done();
      });
  });

  test('should delete the existing stapleTemplate', (done) => {
    let stapleTemplateId;

    StapleTemplateService.create(createStapleTemplateInfo())
      .then((id) => {
        stapleTemplateId = id;
        return StapleTemplateService.delete(stapleTemplateId);
      })
      .then(() => StapleTemplateService.read(stapleTemplateId))
      .catch((error) => {
        expect(error)
          .toBe(`No staple template found with Id: ${stapleTemplateId}`);
        done();
      });
  });
});

describe('search', () => {
  test('should return no staple template if provided criteria matches no stapleTemplate', (done) => {
    StapleTemplateService.search(createCriteria())
      .then((stapleTemplates) => {
        expect(stapleTemplates.size)
          .toBe(0);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the stapleTemplates matches the criteria', (done) => {
    const expectedStapleTemplateInfo = createStapleTemplateInfo();
    let stapleTemplateId;

    StapleTemplateService.create(expectedStapleTemplateInfo)
      .then((id) => {
        stapleTemplateId = id;

        return StapleTemplateService.search(createCriteriaUsingProvidedStapleTemplateInfo(expectedStapleTemplateInfo));
      })
      .then((stapleTemplateInfos) => {
        expect(stapleTemplateInfos.size)
          .toBe(1);

        const stapleTemplateInfo = stapleTemplateInfos.first();
        expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('searchAll', () => {
  test('should return no staple template if provided criteria matches no stapleTemplate', (done) => {
    const result = StapleTemplateService.searchAll(createCriteria());
    let stapleTemplates = List();

    result.event.subscribe((stapleTemplate) => {
      stapleTemplates = stapleTemplates.push(stapleTemplate);
    });
    result.promise.then(() => {
      result.event.unsubscribeAll();
      expect(stapleTemplates.size)
          .toBe(0);
      done();
    })
      .catch((error) => {
        result.event.unsubscribeAll();
        fail(error);
        done();
      });
  });

  test('should return the stapleTemplates matches the criteria', (done) => {
    const expectedStapleTemplateInfo = createStapleTemplateInfo();

    Promise.all([StapleTemplateService.create(expectedStapleTemplateInfo), StapleTemplateService.create(expectedStapleTemplateInfo)])
      .then((ids) => {
        const stapleTemplateIds = List.of(ids[0], ids[1]);
        const result = StapleTemplateService.searchAll(createCriteriaUsingProvidedStapleTemplateInfo(expectedStapleTemplateInfo));
        let stapleTemplates = List();

        result.event.subscribe((stapleTemplate) => {
          stapleTemplates = stapleTemplates.push(stapleTemplate);
        });
        result.promise.then(() => {
          result.event.unsubscribeAll();
          expect(stapleTemplates.size)
              .toBe(stapleTemplateIds.size);
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
  test('should return false if no staple template match provided criteria', (done) => {
    StapleTemplateService.exists(createCriteria())
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

  test('should return true if any staple template match provided criteria', (done) => {
    const stapleTemplateInfo = createStapleTemplateInfo();

    StapleTemplateService.create(stapleTemplateInfo)
      .then(() => StapleTemplateService.exists(createCriteriaUsingProvidedStapleTemplateInfo(stapleTemplateInfo)))
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
