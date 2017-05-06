'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCriteria = createCriteria;
exports.createCriteriaUsingProvidedStapleTemplateShoppingListInfo = createCriteriaUsingProvidedStapleTemplateShoppingListInfo;

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../bootstrap');

var _stapleTemplateShoppingListService = require('./staple-template-shopping-list-service');

var _stapleTemplateShoppingListService2 = _interopRequireDefault(_stapleTemplateShoppingListService);

var _stapleTemplateShoppingList = require('./schema/staple-template-shopping-list.test');

var _stapleTemplate = require('./schema/staple-template.test');

var _schema = require('./schema');

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
    _stapleTemplateShoppingListService2.default.create((0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)()).then(function (result) {
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

    Promise.all([_schema.StapleTemplate.spawn((0, _stapleTemplate.createStapleTemplateInfo)()).save(), _schema.StapleTemplate.spawn((0, _stapleTemplate.createStapleTemplateInfo)()).save()]).then(function (results) {
      expectedStapleTemplateShoppingListInfo = (0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)(_immutable.List.of(results[0].id, results[1].id));

      return _stapleTemplateShoppingListService2.default.create(expectedStapleTemplateShoppingListInfo);
    }).then(function (id) {
      stapleTemplateShoppingListId = id;

      return _stapleTemplateShoppingListService2.default.read(stapleTemplateShoppingListId);
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

    _stapleTemplateShoppingListService2.default.read(stapleTemplateShoppingListId).catch(function (error) {
      expect(error).toBe('No staple template shopping list found with Id: ' + stapleTemplateShoppingListId);
      done();
    });
  });

  test('should read the existing staple template shopping list', function (done) {
    var expectedStapleTemplateShoppingListInfo = void 0;
    var stapleTemplateShoppingListId = void 0;

    Promise.all([_schema.StapleTemplate.spawn((0, _stapleTemplate.createStapleTemplateInfo)()).save(), _schema.StapleTemplate.spawn((0, _stapleTemplate.createStapleTemplateInfo)()).save()]).then(function (results) {
      expectedStapleTemplateShoppingListInfo = (0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)(_immutable.List.of(results[0].id, results[1].id));

      return _stapleTemplateShoppingListService2.default.create(expectedStapleTemplateShoppingListInfo);
    }).then(function (id) {
      stapleTemplateShoppingListId = id;

      return _stapleTemplateShoppingListService2.default.read(stapleTemplateShoppingListId);
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

    _stapleTemplateShoppingListService2.default.update((0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)().set('id', stapleTemplateShoppingListId)).catch(function (error) {
      expect(error).toBe('No staple template shopping list found with Id: ' + stapleTemplateShoppingListId);
      done();
    });
  });

  test('should return the Id of the updated staple template shopping list', function (done) {
    var stapleTemplateShoppingListId = void 0;

    _stapleTemplateShoppingListService2.default.create((0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)()).then(function (id) {
      stapleTemplateShoppingListId = id;

      return _stapleTemplateShoppingListService2.default.update((0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)().set('id', stapleTemplateShoppingListId));
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

    Promise.all([_schema.StapleTemplate.spawn((0, _stapleTemplate.createStapleTemplateInfo)()).save(), _schema.StapleTemplate.spawn((0, _stapleTemplate.createStapleTemplateInfo)()).save(), _stapleTemplateShoppingListService2.default.create((0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)())]).then(function (results) {
      expectedStapleTemplateShoppingListInfo = (0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)(_immutable.List.of(results[0].id, results[1].id));

      return _stapleTemplateShoppingListService2.default.update(expectedStapleTemplateShoppingListInfo.set('id', results[2]));
    }).then(function (id) {
      stapleTemplateShoppingListId = id;

      return _stapleTemplateShoppingListService2.default.read(stapleTemplateShoppingListId);
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

    _stapleTemplateShoppingListService2.default.delete(stapleTemplateShoppingListId).catch(function (error) {
      expect(error).toBe('No staple template shopping list found with Id: ' + stapleTemplateShoppingListId);
      done();
    });
  });

  test('should delete the existing staple template shopping list', function (done) {
    var stapleTemplateShoppingListId = void 0;

    _stapleTemplateShoppingListService2.default.create((0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)()).then(function (id) {
      stapleTemplateShoppingListId = id;
      return _stapleTemplateShoppingListService2.default.delete(stapleTemplateShoppingListId);
    }).then(function () {
      return _stapleTemplateShoppingListService2.default.read(stapleTemplateShoppingListId);
    }).catch(function (error) {
      expect(error).toBe('No staple template shopping list found with Id: ' + stapleTemplateShoppingListId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no staple template shopping list if provided criteria matches no staple template shopping list', function (done) {
    _stapleTemplateShoppingListService2.default.search(createCriteria()).then(function (stapleTemplateShoppingListInfos) {
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

    Promise.all([_schema.StapleTemplate.spawn((0, _stapleTemplate.createStapleTemplateInfo)()).save(), _schema.StapleTemplate.spawn((0, _stapleTemplate.createStapleTemplateInfo)()).save()]).then(function (results) {
      expectedStapleTemplateShoppingListInfo = (0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)(_immutable.List.of(results[0].id, results[1].id));

      return _stapleTemplateShoppingListService2.default.create(expectedStapleTemplateShoppingListInfo);
    }).then(function (id) {
      stapleTemplateShoppingListId = id;

      return _stapleTemplateShoppingListService2.default.search(createCriteriaUsingProvidedStapleTemplateShoppingListInfo(expectedStapleTemplateShoppingListInfo));
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
    var result = _stapleTemplateShoppingListService2.default.searchAll(createCriteria());
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
    var expectedStapleTemplateShoppingListInfo = (0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)();

    Promise.all([_stapleTemplateShoppingListService2.default.create(expectedStapleTemplateShoppingListInfo), _stapleTemplateShoppingListService2.default.create(expectedStapleTemplateShoppingListInfo)]).then(function (ids) {
      var stapleTemplateShoppingListIds = _immutable.List.of(ids[0], ids[1]);
      var result = _stapleTemplateShoppingListService2.default.searchAll(createCriteriaUsingProvidedStapleTemplateShoppingListInfo(expectedStapleTemplateShoppingListInfo));
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
    _stapleTemplateShoppingListService2.default.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any staple template shopping list match provided criteria', function (done) {
    var stapleTemplateShoppingListInfo = (0, _stapleTemplateShoppingList.createStapleTemplateShoppingListInfo)();

    _stapleTemplateShoppingListService2.default.create(stapleTemplateShoppingListInfo).then(function () {
      return _stapleTemplateShoppingListService2.default.exists(createCriteriaUsingProvidedStapleTemplateShoppingListInfo(stapleTemplateShoppingListInfo));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});