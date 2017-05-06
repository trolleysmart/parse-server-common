'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../bootstrap');

var _tagService = require('./tag-service');

var _tagService2 = _interopRequireDefault(_tagService);

var _tag = require('./schema/tag.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectTagInfo(tagInfo, expectedTagInfo, tagId) {
  expect(tagInfo.get('id')).toBe(tagId);
  expect(tagInfo.get('name')).toBe(expectedTagInfo.get('name'));
  expect(tagInfo.get('weight')).toBe(expectedTagInfo.get('weight'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('name', 'weight'),
    conditions: (0, _immutable.Map)({
      name: (0, _v2.default)(),
      weight: 1
    })
  });
}

function createCriteriaUsingProvidedTagInfo(tagInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('name', 'weight'),
    conditions: (0, _immutable.Map)({
      name: tagInfo.get('name'),
      weigth: tagInfo.get('weight')
    })
  });
}

describe('create', function () {
  test('should return the created tag Id', function (done) {
    _tagService2.default.create((0, _tag.createTagInfo)()).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the tag', function (done) {
    var expectedTagInfo = (0, _tag.createTagInfo)();
    var tagId = void 0;

    _tagService2.default.create(expectedTagInfo).then(function (id) {
      tagId = id;

      return _tagService2.default.read(tagId);
    }).then(function (tagInfo) {
      expectTagInfo(tagInfo, expectedTagInfo, tagId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('read', function () {
  test('should reject if the provided tag Id does not exist', function (done) {
    var tagId = (0, _v2.default)();

    _tagService2.default.read(tagId).catch(function (error) {
      expect(error).toBe('No tag found with Id: ' + tagId);
      done();
    });
  });

  test('should read the existing tag', function (done) {
    var expectedTagInfo = (0, _tag.createTagInfo)();
    var tagId = void 0;

    _tagService2.default.create(expectedTagInfo).then(function (id) {
      tagId = id;

      return _tagService2.default.read(tagId);
    }).then(function (tagInfo) {
      expectTagInfo(tagInfo, expectedTagInfo, tagId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('update', function () {
  test('should reject if the provided tag Id does not exist', function (done) {
    var tagId = (0, _v2.default)();

    _tagService2.default.update((0, _tag.createTagInfo)().set('id', tagId)).catch(function (error) {
      expect(error).toBe('No tag found with Id: ' + tagId);
      done();
    });
  });

  test('should return the Id of the updated tag', function (done) {
    var tagId = void 0;

    _tagService2.default.create((0, _tag.createTagInfo)()).then(function (id) {
      tagId = id;

      return _tagService2.default.update((0, _tag.createTagInfo)().set('id', tagId));
    }).then(function (id) {
      expect(id).toBe(tagId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing tag', function (done) {
    var expectedTagInfo = (0, _tag.createTagInfo)();
    var tagId = void 0;

    _tagService2.default.create((0, _tag.createTagInfo)()).then(function (id) {
      return _tagService2.default.update(expectedTagInfo.set('id', id));
    }).then(function (id) {
      tagId = id;

      return _tagService2.default.read(tagId);
    }).then(function (tagInfo) {
      expectTagInfo(tagInfo, expectedTagInfo, tagId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('delete', function () {
  test('should reject if the provided tag Id does not exist', function (done) {
    var tagId = (0, _v2.default)();

    _tagService2.default.delete(tagId).catch(function (error) {
      expect(error).toBe('No tag found with Id: ' + tagId);
      done();
    });
  });

  test('should delete the existing tag', function (done) {
    var tagId = void 0;

    _tagService2.default.create((0, _tag.createTagInfo)()).then(function (id) {
      tagId = id;
      return _tagService2.default.delete(tagId);
    }).then(function () {
      return _tagService2.default.read(tagId);
    }).catch(function (error) {
      expect(error).toBe('No tag found with Id: ' + tagId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no tag if provided criteria matches no tag', function (done) {
    _tagService2.default.search(createCriteria()).then(function (tags) {
      expect(tags.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the tags matches the criteria', function (done) {
    var expectedTagInfo = (0, _tag.createTagInfo)();
    var tagId = void 0;

    _tagService2.default.create(expectedTagInfo).then(function (id) {
      tagId = id;

      return _tagService2.default.search(createCriteriaUsingProvidedTagInfo(expectedTagInfo));
    }).then(function (tagInfos) {
      expect(tagInfos.size).toBe(1);

      var tagInfo = tagInfos.first();
      expectTagInfo(tagInfo, expectedTagInfo, tagId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});

describe('searchAll', function () {
  test('should return no tag if provided criteria matches no tag', function (done) {
    var result = _tagService2.default.searchAll(createCriteria());
    var tags = (0, _immutable.List)();

    result.event.subscribe(function (tag) {
      tags = tags.push(tag);
    });
    result.promise.then(function () {
      result.event.unsubscribeAll();
      expect(tags.size).toBe(0);
      done();
    }).catch(function (error) {
      result.event.unsubscribeAll();
      fail(error);
      done();
    });
  });

  test('should return the tags matches the criteria', function (done) {
    var expectedTagInfo = (0, _tag.createTagInfo)();

    Promise.all([_tagService2.default.create(expectedTagInfo), _tagService2.default.create(expectedTagInfo)]).then(function (ids) {
      var tagIds = _immutable.List.of(ids[0], ids[1]);
      var result = _tagService2.default.searchAll(createCriteriaUsingProvidedTagInfo(expectedTagInfo));
      var tags = (0, _immutable.List)();

      result.event.subscribe(function (tag) {
        tags = tags.push(tag);
      });
      result.promise.then(function () {
        result.event.unsubscribeAll();
        expect(tags.size).toBe(tagIds.size);
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
  test('should return false if no tag match provided criteria', function (done) {
    _tagService2.default.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any tag match provided criteria', function (done) {
    var tagInfo = (0, _tag.createTagInfo)();

    _tagService2.default.create(tagInfo).then(function () {
      return _tagService2.default.exists(createCriteriaUsingProvidedTagInfo(tagInfo));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});