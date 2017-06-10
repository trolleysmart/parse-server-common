'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _ = require('../');

var _StapleTemplate = require('../../schema/__tests__/StapleTemplate.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId) {
  expect(stapleTemplateInfo.get('id')).toBe(stapleTemplateId);
  expect(stapleTemplateInfo.get('name')).toBe(expectedStapleTemplateInfo.get('name'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('name'),
    conditions: (0, _immutable.Map)({
      name: (0, _v2.default)()
    })
  });
}

function createCriteriaUsingProvidedStapleTemplateInfo(stapleTemplateInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('name'),
    conditions: (0, _immutable.Map)({
      name: stapleTemplateInfo.get('name')
    })
  });
}

describe('create', function () {
  test('should return the created staple template Id', function (done) {
    _.StapleTemplateService.create((0, _StapleTemplate.createStapleTemplateInfo)()).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the stapleTemplate', function (done) {
    var expectedStapleTemplateInfo = (0, _StapleTemplate.createStapleTemplateInfo)();
    var stapleTemplateId = void 0;

    _.StapleTemplateService.create(expectedStapleTemplateInfo).then(function (id) {
      stapleTemplateId = id;

      return _.StapleTemplateService.read(stapleTemplateId);
    }).then(function (stapleTemplateInfo) {
      expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('read', function () {
  test('should reject if the provided staple template Id does not exist', function (done) {
    var stapleTemplateId = (0, _v2.default)();

    _.StapleTemplateService.read(stapleTemplateId).catch(function (error) {
      expect(error).toBe('No staple template found with Id: ' + stapleTemplateId);
      done();
    });
  });

  test('should read the existing stapleTemplate', function (done) {
    var expectedStapleTemplateInfo = (0, _StapleTemplate.createStapleTemplateInfo)();
    var stapleTemplateId = void 0;

    _.StapleTemplateService.create(expectedStapleTemplateInfo).then(function (id) {
      stapleTemplateId = id;

      return _.StapleTemplateService.read(stapleTemplateId);
    }).then(function (stapleTemplateInfo) {
      expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('update', function () {
  test('should reject if the provided staple template Id does not exist', function (done) {
    var stapleTemplateId = (0, _v2.default)();

    _.StapleTemplateService.update((0, _StapleTemplate.createStapleTemplateInfo)().set('id', stapleTemplateId)).catch(function (error) {
      expect(error).toBe('No staple template found with Id: ' + stapleTemplateId);
      done();
    });
  });

  test('should return the Id of the updated stapleTemplate', function (done) {
    var stapleTemplateId = void 0;

    _.StapleTemplateService.create((0, _StapleTemplate.createStapleTemplateInfo)()).then(function (id) {
      stapleTemplateId = id;

      return _.StapleTemplateService.update((0, _StapleTemplate.createStapleTemplateInfo)().set('id', stapleTemplateId));
    }).then(function (id) {
      expect(id).toBe(stapleTemplateId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing stapleTemplate', function (done) {
    var expectedStapleTemplateInfo = (0, _StapleTemplate.createStapleTemplateInfo)();
    var stapleTemplateId = void 0;

    _.StapleTemplateService.create((0, _StapleTemplate.createStapleTemplateInfo)()).then(function (id) {
      return _.StapleTemplateService.update(expectedStapleTemplateInfo.set('id', id));
    }).then(function (id) {
      stapleTemplateId = id;

      return _.StapleTemplateService.read(stapleTemplateId);
    }).then(function (stapleTemplateInfo) {
      expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('delete', function () {
  test('should reject if the provided staple template Id does not exist', function (done) {
    var stapleTemplateId = (0, _v2.default)();

    _.StapleTemplateService.delete(stapleTemplateId).catch(function (error) {
      expect(error).toBe('No staple template found with Id: ' + stapleTemplateId);
      done();
    });
  });

  test('should delete the existing stapleTemplate', function (done) {
    var stapleTemplateId = void 0;

    _.StapleTemplateService.create((0, _StapleTemplate.createStapleTemplateInfo)()).then(function (id) {
      stapleTemplateId = id;
      return _.StapleTemplateService.delete(stapleTemplateId);
    }).then(function () {
      return _.StapleTemplateService.read(stapleTemplateId);
    }).catch(function (error) {
      expect(error).toBe('No staple template found with Id: ' + stapleTemplateId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no staple template if provided criteria matches no stapleTemplate', function (done) {
    _.StapleTemplateService.search(createCriteria()).then(function (stapleTemplates) {
      expect(stapleTemplates.count()).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the stapleTemplates matches the criteria', function (done) {
    var expectedStapleTemplateInfo = (0, _StapleTemplate.createStapleTemplateInfo)();
    var stapleTemplateId = void 0;

    _.StapleTemplateService.create(expectedStapleTemplateInfo).then(function (id) {
      stapleTemplateId = id;

      return _.StapleTemplateService.search(createCriteriaUsingProvidedStapleTemplateInfo(expectedStapleTemplateInfo));
    }).then(function (stapleTemplateInfos) {
      expect(stapleTemplateInfos.count()).toBe(1);

      var stapleTemplateInfo = stapleTemplateInfos.first();
      expectStapleTemplateInfo(stapleTemplateInfo, expectedStapleTemplateInfo, stapleTemplateId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('searchAll', function () {
  test('should return no staple template if provided criteria matches no stapleTemplate', function (done) {
    var result = _.StapleTemplateService.searchAll(createCriteria());
    var stapleTemplates = (0, _immutable.List)();

    result.event.subscribe(function (stapleTemplate) {
      stapleTemplates = stapleTemplates.push(stapleTemplate);
    });
    result.promise.then(function () {
      result.event.unsubscribeAll();
      expect(stapleTemplates.count()).toBe(0);
      done();
    }).catch(function (error) {
      result.event.unsubscribeAll();
      fail(error);
      done();
    });
  });

  test('should return the stapleTemplates matches the criteria', function (done) {
    var expectedStapleTemplateInfo = (0, _StapleTemplate.createStapleTemplateInfo)();

    Promise.all([_.StapleTemplateService.create(expectedStapleTemplateInfo), _.StapleTemplateService.create(expectedStapleTemplateInfo)]).then(function (ids) {
      var stapleTemplateIds = _immutable.List.of(ids[0], ids[1]);
      var result = _.StapleTemplateService.searchAll(createCriteriaUsingProvidedStapleTemplateInfo(expectedStapleTemplateInfo));
      var stapleTemplates = (0, _immutable.List)();

      result.event.subscribe(function (stapleTemplate) {
        stapleTemplates = stapleTemplates.push(stapleTemplate);
      });
      result.promise.then(function () {
        result.event.unsubscribeAll();
        expect(stapleTemplates.count()).toBe(stapleTemplateIds.count());
        done();
      }).catch(function (error) {
        result.event.unsubscribeAll();
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
  test('should return false if no staple template match provided criteria', function (done) {
    _.StapleTemplateService.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any staple template match provided criteria', function (done) {
    var stapleTemplateInfo = (0, _StapleTemplate.createStapleTemplateInfo)();

    _.StapleTemplateService.create(stapleTemplateInfo).then(function () {
      return _.StapleTemplateService.exists(createCriteriaUsingProvidedStapleTemplateInfo(stapleTemplateInfo));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});