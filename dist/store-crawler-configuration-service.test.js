'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../bootstrap');

var _storeCrawlerConfigurationService = require('./store-crawler-configuration-service');

var _storeCrawlerConfiguration = require('./schema/store-crawler-configuration.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo, storeCrawlerConfigurationId) {
  expect(storeCrawlerConfigurationInfo.get('id')).toBe(storeCrawlerConfigurationId);
  expect(storeCrawlerConfigurationInfo.get('key')).toBe(expectedStoreCrawlerConfigurationInfo.get('key'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    key: (0, _v2.default)()
  });
}

function createCriteriaUsingProvidedStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo) {
  return (0, _immutable.Map)({
    key: storeCrawlerConfigurationInfo.get('key')
  });
}

describe('create', function () {
  test('should return the created store crawler configuration Id', function (done) {
    _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.create((0, _storeCrawlerConfiguration.createStoreCrawlerConfigurationInfo)()).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the store crawler configuration', function (done) {
    var expectedStoreCrawlerConfigurationInfo = (0, _storeCrawlerConfiguration.createStoreCrawlerConfigurationInfo)();
    var storeCrawlerConfigurationId = void 0;

    _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo).then(function (id) {
      storeCrawlerConfigurationId = id;

      return _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId);
    }).then(function (storeCrawlerConfigurationInfo) {
      expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo, storeCrawlerConfigurationId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('read', function () {
  test('should reject if the provided store crawler configuration Id does not exist', function (done) {
    var storeCrawlerConfigurationId = (0, _v2.default)();

    _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId).catch(function (error) {
      expect(error).toBe('No store crawler configuration found with Id: ' + storeCrawlerConfigurationId);
      done();
    });
  });

  test('should read the existing store crawler configuration', function (done) {
    var expectedStoreCrawlerConfigurationInfo = (0, _storeCrawlerConfiguration.createStoreCrawlerConfigurationInfo)();
    var storeCrawlerConfigurationId = void 0;

    _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo).then(function (id) {
      storeCrawlerConfigurationId = id;

      return _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId);
    }).then(function (storeCrawlerConfigurationInfo) {
      expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo, storeCrawlerConfigurationId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('update', function () {
  test('should reject if the provided store crawler configuration Id does not exist', function (done) {
    var storeCrawlerConfigurationId = (0, _v2.default)();

    _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.update((0, _storeCrawlerConfiguration.createStoreCrawlerConfigurationInfo)().set('id', storeCrawlerConfigurationId)).catch(function (error) {
      expect(error).toBe('No store crawler configuration found with Id: ' + storeCrawlerConfigurationId);
      done();
    });
  });

  test('should return the Id of the updated store crawler configuration', function (done) {
    var storeCrawlerConfigurationId = void 0;

    _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.create((0, _storeCrawlerConfiguration.createStoreCrawlerConfigurationInfo)()).then(function (id) {
      storeCrawlerConfigurationId = id;

      return _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.update((0, _storeCrawlerConfiguration.createStoreCrawlerConfigurationInfo)().set('id', storeCrawlerConfigurationId));
    }).then(function (id) {
      expect(id).toBe(storeCrawlerConfigurationId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing store crawler configuration', function (done) {
    var expectedStoreCrawlerConfigurationInfo = (0, _storeCrawlerConfiguration.createStoreCrawlerConfigurationInfo)();
    var storeCrawlerConfigurationId = void 0;

    _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.create((0, _storeCrawlerConfiguration.createStoreCrawlerConfigurationInfo)()).then(function (id) {
      return _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.update(expectedStoreCrawlerConfigurationInfo.set('id', id));
    }).then(function (id) {
      storeCrawlerConfigurationId = id;

      return _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId);
    }).then(function (storeCrawlerConfigurationInfo) {
      expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo, storeCrawlerConfigurationId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('delete', function () {
  test('should reject if the provided store crawler configuration Id does not exist', function (done) {
    var storeCrawlerConfigurationId = (0, _v2.default)();

    _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.delete(storeCrawlerConfigurationId).catch(function (error) {
      expect(error).toBe('No store crawler configuration found with Id: ' + storeCrawlerConfigurationId);
      done();
    });
  });

  test('should delete the existing store crawler configuration', function (done) {
    var storeCrawlerConfigurationId = void 0;

    _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.create((0, _storeCrawlerConfiguration.createStoreCrawlerConfigurationInfo)()).then(function (id) {
      storeCrawlerConfigurationId = id;
      return _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.delete(storeCrawlerConfigurationId);
    }).then(function () {
      return _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.read(storeCrawlerConfigurationId);
    }).catch(function (error) {
      expect(error).toBe('No store crawler configuration found with Id: ' + storeCrawlerConfigurationId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no store crawler configuration if provided criteria matches no store crawler configuration', function (done) {
    _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.search(createCriteria()).then(function (storeCrawlerConfigurations) {
      expect(storeCrawlerConfigurations.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the store crawler configurations matches the criteria', function (done) {
    var expectedStoreCrawlerConfigurationInfo = (0, _storeCrawlerConfiguration.createStoreCrawlerConfigurationInfo)();
    var storeCrawlerConfigurationId = void 0;

    _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo).then(function (id) {
      storeCrawlerConfigurationId = id;

      return _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.search(createCriteriaUsingProvidedStoreCrawlerConfigurationInfo(expectedStoreCrawlerConfigurationInfo));
    }).then(function (storeCrawlerConfigurationInfos) {
      expect(storeCrawlerConfigurationInfos.size).toBe(1);

      var storeCrawlerConfigurationInfo = storeCrawlerConfigurationInfos.first();
      expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo, storeCrawlerConfigurationId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the latest store crawler configuration matches the criteria when latest is set', function (done) {
    var expectedStoreCrawlerConfigurationInfo = (0, _storeCrawlerConfiguration.createStoreCrawlerConfigurationInfo)();
    var storeCrawlerConfigurationId = void 0;

    _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo).then(function () {
      return _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo);
    }).then(function (id) {
      storeCrawlerConfigurationId = id;

      var criteria = createCriteriaUsingProvidedStoreCrawlerConfigurationInfo(expectedStoreCrawlerConfigurationInfo);

      return _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.search(criteria.set('latest', true));
    }).then(function (storeCrawlerConfigurationInfos) {
      expect(storeCrawlerConfigurationInfos.size).toBe(1);

      var storeCrawlerConfigurationInfo = storeCrawlerConfigurationInfos.first();
      expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo, storeCrawlerConfigurationId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('searchAll', function () {
  test('should return no store crawler configuration if provided criteria matches no store crawler configuration', function (done) {
    var result = _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.searchAll(createCriteria());
    var storeCrawlerConfigurations = (0, _immutable.List)();

    result.event.subscribe(function (storeCrawlerConfiguration) {
      storeCrawlerConfigurations = storeCrawlerConfigurations.push(storeCrawlerConfiguration);
    });
    result.promise.then(function () {
      expect(storeCrawlerConfigurations.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the store crawler configurations matches the criteria', function (done) {
    var expectedStoreCrawlerConfigurationInfo = (0, _storeCrawlerConfiguration.createStoreCrawlerConfigurationInfo)();

    Promise.all([_storeCrawlerConfigurationService.StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo), _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.create(expectedStoreCrawlerConfigurationInfo)]).then(function (ids) {
      var storeCrawlerConfigurationIds = _immutable.List.of(ids[0], ids[1]);
      var result = _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.searchAll(createCriteriaUsingProvidedStoreCrawlerConfigurationInfo(expectedStoreCrawlerConfigurationInfo));
      var storeCrawlerConfigurations = (0, _immutable.List)();

      result.event.subscribe(function (storeCrawlerConfiguration) {
        storeCrawlerConfigurations = storeCrawlerConfigurations.push(storeCrawlerConfiguration);
      });
      result.promise.then(function () {
        expect(storeCrawlerConfigurations.size).toBe(storeCrawlerConfigurationIds.size);
        done();
      }).catch(function (error) {
        fail(error);
        done();
      });
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('exists', function () {
  test('should return false if no store crawler configuration match provided criteria', function (done) {
    _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any store crawler configuration match provided criteria', function (done) {
    var storeCrawlerConfigurationInfo = (0, _storeCrawlerConfiguration.createStoreCrawlerConfigurationInfo)();

    _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.create(storeCrawlerConfigurationInfo).then(function () {
      return _storeCrawlerConfigurationService.StoreCrawlerConfigurationService.exists(createCriteriaUsingProvidedStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});