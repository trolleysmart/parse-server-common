'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCriteria = createCriteria;
exports.createCriteriaUsingProvidedStapleTemplateShoppingListInfo = createCriteriaUsingProvidedStapleTemplateShoppingListInfo;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _ = require('../');

var _StapleTemplateShoppingList = require('../../schema/__tests__/StapleTemplateShoppingList.test');

var _StapleTemplate = require('../../schema/__tests__/StapleTemplate.test');

var _schema = require('../../schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId) {
  expect(stapleTemplateShoppingListInfo.get('id')).toBe(stapleTemplateShoppingListId);
  expect(stapleTemplateShoppingListInfo.get('description')).toBe(expectedStapleTemplateShoppingListInfo.get('description'));
  expect(stapleTemplateShoppingListInfo.get('stapleTemplateIds')).toEqual(expectedStapleTemplateShoppingListInfo.get('stapleTemplateIds'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('description', 'stapleTemplates'),
    includeStapleTemplates: true,
    conditions: (0, _immutable.Map)({
      description: (0, _v2.default)()
    })
  });
}

function createCriteriaUsingProvidedStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('description', 'stapleTemplates'),
    includeStapleTemplates: true,
    conditions: (0, _immutable.Map)({
      description: stapleTemplateShoppingListInfo.get('description'),
      stapleTemplates: stapleTemplateShoppingListInfo.get('stapleTemplates')
    })
  });
}

describe('create', function () {
  test('should return the created staple template shopping list Id', function (done) {
    _.StapleTemplateShoppingListService.create((0, _StapleTemplateShoppingList.createStapleTemplateShoppingListInfo)()).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the staple template shopping list', function (done) {
    var expectedStapleTemplateShoppingListInfo = void 0;
    var stapleTemplateShoppingListId = void 0;

    Promise.all([_schema.StapleTemplate.spawn((0, _StapleTemplate.createStapleTemplateInfo)()).save(), _schema.StapleTemplate.spawn((0, _StapleTemplate.createStapleTemplateInfo)()).save()]).then(function (results) {
      expectedStapleTemplateShoppingListInfo = (0, _StapleTemplateShoppingList.createStapleTemplateShoppingListInfo)(_immutable.List.of(results[0].id, results[1].id));

      return _.StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo);
    }).then(function (id) {
      stapleTemplateShoppingListId = id;

      return _.StapleTemplateShoppingListService.read(stapleTemplateShoppingListId);
    }).then(function (stapleTemplateShoppingListInfo) {
      expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('read', function () {
  test('should reject if the provided staple template shopping list Id does not exist', function (done) {
    var stapleTemplateShoppingListId = (0, _v2.default)();

    _.StapleTemplateShoppingListService.read(stapleTemplateShoppingListId).catch(function (error) {
      expect(error).toBe('No staple template shopping list found with Id: ' + stapleTemplateShoppingListId);
      done();
    });
  });

  test('should read the existing staple template shopping list', function (done) {
    var expectedStapleTemplateShoppingListInfo = void 0;
    var stapleTemplateShoppingListId = void 0;

    Promise.all([_schema.StapleTemplate.spawn((0, _StapleTemplate.createStapleTemplateInfo)()).save(), _schema.StapleTemplate.spawn((0, _StapleTemplate.createStapleTemplateInfo)()).save()]).then(function (results) {
      expectedStapleTemplateShoppingListInfo = (0, _StapleTemplateShoppingList.createStapleTemplateShoppingListInfo)(_immutable.List.of(results[0].id, results[1].id));

      return _.StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo);
    }).then(function (id) {
      stapleTemplateShoppingListId = id;

      return _.StapleTemplateShoppingListService.read(stapleTemplateShoppingListId);
    }).then(function (stapleTemplateShoppingListInfo) {
      expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('update', function () {
  test('should reject if the provided staple template shopping list Id does not exist', function (done) {
    var stapleTemplateShoppingListId = (0, _v2.default)();

    _.StapleTemplateShoppingListService.update((0, _StapleTemplateShoppingList.createStapleTemplateShoppingListInfo)().set('id', stapleTemplateShoppingListId)).catch(function (error) {
      expect(error).toBe('No staple template shopping list found with Id: ' + stapleTemplateShoppingListId);
      done();
    });
  });

  test('should return the Id of the updated staple template shopping list', function (done) {
    var stapleTemplateShoppingListId = void 0;

    _.StapleTemplateShoppingListService.create((0, _StapleTemplateShoppingList.createStapleTemplateShoppingListInfo)()).then(function (id) {
      stapleTemplateShoppingListId = id;

      return _.StapleTemplateShoppingListService.update((0, _StapleTemplateShoppingList.createStapleTemplateShoppingListInfo)().set('id', stapleTemplateShoppingListId));
    }).then(function (id) {
      expect(id).toBe(stapleTemplateShoppingListId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing staple template shopping list', function (done) {
    var expectedStapleTemplateShoppingListInfo = void 0;
    var stapleTemplateShoppingListId = void 0;

    Promise.all([_schema.StapleTemplate.spawn((0, _StapleTemplate.createStapleTemplateInfo)()).save(), _schema.StapleTemplate.spawn((0, _StapleTemplate.createStapleTemplateInfo)()).save(), _.StapleTemplateShoppingListService.create((0, _StapleTemplateShoppingList.createStapleTemplateShoppingListInfo)())]).then(function (results) {
      expectedStapleTemplateShoppingListInfo = (0, _StapleTemplateShoppingList.createStapleTemplateShoppingListInfo)(_immutable.List.of(results[0].id, results[1].id));

      return _.StapleTemplateShoppingListService.update(expectedStapleTemplateShoppingListInfo.set('id', results[2]));
    }).then(function (id) {
      stapleTemplateShoppingListId = id;

      return _.StapleTemplateShoppingListService.read(stapleTemplateShoppingListId);
    }).then(function (stapleTemplateShoppingListInfo) {
      expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('delete', function () {
  test('should reject if the provided staple template shopping list Id does not exist', function (done) {
    var stapleTemplateShoppingListId = (0, _v2.default)();

    _.StapleTemplateShoppingListService.delete(stapleTemplateShoppingListId).catch(function (error) {
      expect(error).toBe('No staple template shopping list found with Id: ' + stapleTemplateShoppingListId);
      done();
    });
  });

  test('should delete the existing staple template shopping list', function (done) {
    var stapleTemplateShoppingListId = void 0;

    _.StapleTemplateShoppingListService.create((0, _StapleTemplateShoppingList.createStapleTemplateShoppingListInfo)()).then(function (id) {
      stapleTemplateShoppingListId = id;
      return _.StapleTemplateShoppingListService.delete(stapleTemplateShoppingListId);
    }).then(function () {
      return _.StapleTemplateShoppingListService.read(stapleTemplateShoppingListId);
    }).catch(function (error) {
      expect(error).toBe('No staple template shopping list found with Id: ' + stapleTemplateShoppingListId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no staple template shopping list if provided criteria matches no staple template shopping list', function (done) {
    _.StapleTemplateShoppingListService.search(createCriteria()).then(function (stapleTemplateShoppingListInfos) {
      expect(stapleTemplateShoppingListInfos.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the staple template shopping lists matches the criteria', function (done) {
    var expectedStapleTemplateShoppingListInfo = void 0;
    var stapleTemplateShoppingListId = void 0;

    Promise.all([_schema.StapleTemplate.spawn((0, _StapleTemplate.createStapleTemplateInfo)()).save(), _schema.StapleTemplate.spawn((0, _StapleTemplate.createStapleTemplateInfo)()).save()]).then(function (results) {
      expectedStapleTemplateShoppingListInfo = (0, _StapleTemplateShoppingList.createStapleTemplateShoppingListInfo)(_immutable.List.of(results[0].id, results[1].id));

      return _.StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo);
    }).then(function (id) {
      stapleTemplateShoppingListId = id;

      return _.StapleTemplateShoppingListService.search(createCriteriaUsingProvidedStapleTemplateShoppingListInfo(expectedStapleTemplateShoppingListInfo));
    }).then(function (stapleTemplateShoppingListInfos) {
      expect(stapleTemplateShoppingListInfos.size).toBe(1);

      var stapleTemplateShoppingListInfo = stapleTemplateShoppingListInfos.first();
      expectStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo, expectedStapleTemplateShoppingListInfo, stapleTemplateShoppingListId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('searchAll', function () {
  test('should return no staple template shopping list if provided criteria matches no staple template shopping list', function (done) {
    var result = _.StapleTemplateShoppingListService.searchAll(createCriteria());
    var stapleTemplateShoppingLists = (0, _immutable.List)();

    result.event.subscribe(function (stapleTemplateShoppingList) {
      stapleTemplateShoppingLists = stapleTemplateShoppingLists.push(stapleTemplateShoppingList);
    });
    result.promise.then(function () {
      result.event.unsubscribeAll();
      expect(stapleTemplateShoppingLists.size).toBe(0);
      done();
    }).catch(function (error) {
      result.event.unsubscribeAll();
      fail(error);
      done();
    });
  });

  test('should return the staple template shopping lists matches the criteria', function (done) {
    var expectedStapleTemplateShoppingListInfo = (0, _StapleTemplateShoppingList.createStapleTemplateShoppingListInfo)();

    Promise.all([_.StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo), _.StapleTemplateShoppingListService.create(expectedStapleTemplateShoppingListInfo)]).then(function (ids) {
      var stapleTemplateShoppingListIds = _immutable.List.of(ids[0], ids[1]);
      var result = _.StapleTemplateShoppingListService.searchAll(createCriteriaUsingProvidedStapleTemplateShoppingListInfo(expectedStapleTemplateShoppingListInfo));
      var stapleTemplateShoppingLists = (0, _immutable.List)();

      result.event.subscribe(function (stapleTemplateShoppingList) {
        stapleTemplateShoppingLists = stapleTemplateShoppingLists.push(stapleTemplateShoppingList);
      });
      result.promise.then(function () {
        result.event.unsubscribeAll();
        expect(stapleTemplateShoppingLists.size).toBe(stapleTemplateShoppingListIds.size);
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
  test('should return false if no staple template shopping list match provided criteria', function (done) {
    _.StapleTemplateShoppingListService.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any staple template shopping list match provided criteria', function (done) {
    var stapleTemplateShoppingListInfo = (0, _StapleTemplateShoppingList.createStapleTemplateShoppingListInfo)();

    _.StapleTemplateShoppingListService.create(stapleTemplateShoppingListInfo).then(function () {
      return _.StapleTemplateShoppingListService.exists(createCriteriaUsingProvidedStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});