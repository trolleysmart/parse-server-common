import {
  List,
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import '../bootstrap';
import StoreCrawlerConfigurationService from './store-crawler-configuration-service';
import {
  createStoreCrawlerConfigurationInfo,
} from './schema/store-crawler-configuration.test';

function expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo, storeCrawlerConfigurationId) {
  expect(storeCrawlerConfigurationInfo.get('id'))
    .toBe(storeCrawlerConfigurationId);
  expect(storeCrawlerConfigurationInfo.get('key'))
    .toBe(expectedStoreCrawlerConfigurationInfo.get('key'));
}

function createCriteria() {
  return Map({
    fields: List.of('key', 'config'),
    conditions: Map({
      key: uuid(),
      config: Map({
        val: uuid(),
      }),
    }),
  });
}

function createCriteriaUsingProvidedStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo) {
  return Map({
    fields: List.of('key', 'config'),
    conditions: Map({
      key: storeCrawlerConfigurationInfo.get('key'),
      config: storeCrawlerConfigurationInfo.get('config'),
    }),
  });
}

describe('create', () => {
  test('should return the created store crawler configuration Id', (done) => {
    StoreCrawlerConfigurationService.create(createStoreCrawlerConfigurationInfo())
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

  test('should create the store crawler configuration', (done) => {
    const expectedStoreCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();
    let storeCrawlerConfigurationId;

    StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo)
      .then((id) => {
        storeCrawlerConfigurationId = id;

        return StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId);
      })
      .then((storeCrawlerConfigurationInfo) => {
        expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo,
          storeCrawlerConfigurationId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('read', () => {
  test('should reject if the provided store crawler configuration Id does not exist', (done) => {
    const storeCrawlerConfigurationId = uuid();

    StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId)
      .catch((error) => {
        expect(error)
          .toBe(`No store crawler configuration found with Id: ${storeCrawlerConfigurationId}`);
        done();
      });
  });

  test('should read the existing store crawler configuration', (done) => {
    const expectedStoreCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();
    let storeCrawlerConfigurationId;

    StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo)
      .then((id) => {
        storeCrawlerConfigurationId = id;

        return StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId);
      })
      .then((storeCrawlerConfigurationInfo) => {
        expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo,
          storeCrawlerConfigurationId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('update', () => {
  test('should reject if the provided store crawler configuration Id does not exist', (done) => {
    const storeCrawlerConfigurationId = uuid();

    StoreCrawlerConfigurationService.update(createStoreCrawlerConfigurationInfo()
        .set('id', storeCrawlerConfigurationId))
      .catch((error) => {
        expect(error)
          .toBe(`No store crawler configuration found with Id: ${storeCrawlerConfigurationId}`);
        done();
      });
  });

  test('should return the Id of the updated store crawler configuration', (done) => {
    let storeCrawlerConfigurationId;

    StoreCrawlerConfigurationService.create(createStoreCrawlerConfigurationInfo())
      .then((id) => {
        storeCrawlerConfigurationId = id;

        return StoreCrawlerConfigurationService.update(createStoreCrawlerConfigurationInfo()
          .set('id', storeCrawlerConfigurationId));
      })
      .then((id) => {
        expect(id)
          .toBe(storeCrawlerConfigurationId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should update the existing store crawler configuration', (done) => {
    const expectedStoreCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();
    let storeCrawlerConfigurationId;

    StoreCrawlerConfigurationService.create(createStoreCrawlerConfigurationInfo())
      .then(id => StoreCrawlerConfigurationService.update(expectedStoreCrawlerConfigurationInfo.set('id', id)))
      .then((id) => {
        storeCrawlerConfigurationId = id;

        return StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId);
      })
      .then((storeCrawlerConfigurationInfo) => {
        expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo,
          storeCrawlerConfigurationId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('delete', () => {
  test('should reject if the provided store crawler configuration Id does not exist', (done) => {
    const storeCrawlerConfigurationId = uuid();

    StoreCrawlerConfigurationService.delete(storeCrawlerConfigurationId)
      .catch((error) => {
        expect(error)
          .toBe(`No store crawler configuration found with Id: ${storeCrawlerConfigurationId}`);
        done();
      });
  });

  test('should delete the existing store crawler configuration', (done) => {
    let storeCrawlerConfigurationId;

    StoreCrawlerConfigurationService.create(createStoreCrawlerConfigurationInfo())
      .then((id) => {
        storeCrawlerConfigurationId = id;
        return StoreCrawlerConfigurationService.delete(storeCrawlerConfigurationId);
      })
      .then(() => StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId))
      .catch((error) => {
        expect(error)
          .toBe(`No store crawler configuration found with Id: ${storeCrawlerConfigurationId}`);
        done();
      });
  });
});

describe('search', () => {
  test('should return no store crawler configuration if provided criteria matches no store crawler configuration', (done) => {
    StoreCrawlerConfigurationService.search(createCriteria())
      .then((storeCrawlerConfigurations) => {
        expect(storeCrawlerConfigurations.size)
          .toBe(0);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the store crawler configurations matches the criteria', (done) => {
    const expectedStoreCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();
    let storeCrawlerConfigurationId;

    StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo)
      .then((id) => {
        storeCrawlerConfigurationId = id;

        return StoreCrawlerConfigurationService.search(createCriteriaUsingProvidedStoreCrawlerConfigurationInfo(
          expectedStoreCrawlerConfigurationInfo));
      })
      .then((storeCrawlerConfigurationInfos) => {
        expect(storeCrawlerConfigurationInfos.size)
          .toBe(1);

        const storeCrawlerConfigurationInfo = storeCrawlerConfigurationInfos.first();
        expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo,
          storeCrawlerConfigurationId);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});

describe('searchAll', () => {
  test('should return no store crawler configuration if provided criteria matches no store crawler configuration', (done) => {
    const result = StoreCrawlerConfigurationService.searchAll(createCriteria());
    let storeCrawlerConfigurations = List();

    result.event.subscribe((storeCrawlerConfiguration) => {
      storeCrawlerConfigurations = storeCrawlerConfigurations.push(storeCrawlerConfiguration);
    });
    result.promise.then(() => {
      expect(storeCrawlerConfigurations.size)
          .toBe(0);
      done();
    })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  test('should return the store crawler configurations matches the criteria', (done) => {
    const expectedStoreCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();

    Promise.all([StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo), StoreCrawlerConfigurationService.create(
        expectedStoreCrawlerConfigurationInfo)])
      .then((ids) => {
        const storeCrawlerConfigurationIds = List.of(ids[0], ids[1]);
        const result = StoreCrawlerConfigurationService.searchAll(createCriteriaUsingProvidedStoreCrawlerConfigurationInfo(
          expectedStoreCrawlerConfigurationInfo));
        let storeCrawlerConfigurations = List();

        result.event.subscribe((storeCrawlerConfiguration) => {
          storeCrawlerConfigurations = storeCrawlerConfigurations.push(storeCrawlerConfiguration);
        });
        result.promise.then(() => {
          expect(storeCrawlerConfigurations.size)
              .toBe(storeCrawlerConfigurationIds.size);
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
  test('should return false if no store crawler configuration match provided criteria', (done) => {
    StoreCrawlerConfigurationService.exists(createCriteria())
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

  test('should return true if any store crawler configuration match provided criteria', (done) => {
    const storeCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();

    StoreCrawlerConfigurationService.create(storeCrawlerConfigurationInfo)
      .then(() => StoreCrawlerConfigurationService.exists(createCriteriaUsingProvidedStoreCrawlerConfigurationInfo(
        storeCrawlerConfigurationInfo)))
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
