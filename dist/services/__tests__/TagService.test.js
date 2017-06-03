'use strict';

var _immutable = require('immutable');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

require('../../../bootstrap');

var _ = require('../');

var _Tag = require('../../schema/__tests__/Tag.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function expectTagInfo(tagInfo, expectedTagInfo, tagId) {
  expect(tagInfo.get('id')).toBe(tagId);
  expect(tagInfo.get('key')).toBe(expectedTagInfo.get('key'));
  expect(tagInfo.get('description')).toBe(expectedTagInfo.get('description'));
  expect(tagInfo.get('weight')).toBe(expectedTagInfo.get('weight'));
}

function createCriteria() {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('key', 'description', 'weight'),
    conditions: (0, _immutable.Map)({
      key: (0, _v2.default)(),
      description: (0, _v2.default)(),
      weight: 1
    })
  });
}

function createCriteriaUsingProvidedTagInfo(tagInfo) {
  return (0, _immutable.Map)({
    fields: _immutable.List.of('key', 'description', 'weight'),
    conditions: (0, _immutable.Map)({
      key: tagInfo.get('key'),
      description: tagInfo.get('description'),
      weigth: tagInfo.get('weight')
    })
  });
}

describe('create', function () {
  test('should return the created tag Id', function (done) {
    _.TagService.create((0, _Tag.createTagInfo)()).then(function (result) {
      expect(result).toBeDefined();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should create the tag', function (done) {
    var expectedTagInfo = (0, _Tag.createTagInfo)();
    var tagId = void 0;

    _.TagService.create(expectedTagInfo).then(function (id) {
      tagId = id;

      return _.TagService.read(tagId);
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

    _.TagService.read(tagId).catch(function (error) {
      expect(error).toBe('No tag found with Id: ' + tagId);
      done();
    });
  });

  test('should read the existing tag', function (done) {
    var expectedTagInfo = (0, _Tag.createTagInfo)();
    var tagId = void 0;

    _.TagService.create(expectedTagInfo).then(function (id) {
      tagId = id;

      return _.TagService.read(tagId);
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

    _.TagService.update((0, _Tag.createTagInfo)().set('id', tagId)).catch(function (error) {
      expect(error).toBe('No tag found with Id: ' + tagId);
      done();
    });
  });

  test('should return the Id of the updated tag', function (done) {
    var tagId = void 0;

    _.TagService.create((0, _Tag.createTagInfo)()).then(function (id) {
      tagId = id;

      return _.TagService.update((0, _Tag.createTagInfo)().set('id', tagId));
    }).then(function (id) {
      expect(id).toBe(tagId);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should update the existing tag', function (done) {
    var expectedTagInfo = (0, _Tag.createTagInfo)();
    var tagId = void 0;

    _.TagService.create((0, _Tag.createTagInfo)()).then(function (id) {
      return _.TagService.update(expectedTagInfo.set('id', id));
    }).then(function (id) {
      tagId = id;

      return _.TagService.read(tagId);
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

    _.TagService.delete(tagId).catch(function (error) {
      expect(error).toBe('No tag found with Id: ' + tagId);
      done();
    });
  });

  test('should delete the existing tag', function (done) {
    var tagId = void 0;

    _.TagService.create((0, _Tag.createTagInfo)()).then(function (id) {
      tagId = id;
      return _.TagService.delete(tagId);
    }).then(function () {
      return _.TagService.read(tagId);
    }).catch(function (error) {
      expect(error).toBe('No tag found with Id: ' + tagId);
      done();
    });
  });
});

describe('search', function () {
  test('should return no tag if provided criteria matches no tag', function (done) {
    _.TagService.search(createCriteria()).then(function (tags) {
      expect(tags.size).toBe(0);
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return the tags matches the criteria', function (done) {
    var expectedTagInfo = (0, _Tag.createTagInfo)();
    var tagId = void 0;

    _.TagService.create(expectedTagInfo).then(function (id) {
      tagId = id;

      return _.TagService.search(createCriteriaUsingProvidedTagInfo(expectedTagInfo));
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
    var result = _.TagService.searchAll(createCriteria());
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
    var expectedTagInfo = (0, _Tag.createTagInfo)();

    Promise.all([_.TagService.create(expectedTagInfo), _.TagService.create(expectedTagInfo)]).then(function (ids) {
      var tagIds = _immutable.List.of(ids[0], ids[1]);
      var result = _.TagService.searchAll(createCriteriaUsingProvidedTagInfo(expectedTagInfo));
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
    _.TagService.exists(createCriteria()).then(function (response) {
      expect(response).toBeFalsy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });

  test('should return true if any tag match provided criteria', function (done) {
    var tagInfo = (0, _Tag.createTagInfo)();

    _.TagService.create(tagInfo).then(function () {
      return _.TagService.exists(createCriteriaUsingProvidedTagInfo(tagInfo));
    }).then(function (response) {
      expect(response).toBeTruthy();
      done();
    }).catch(function (error) {
      fail(error);
      done();
    });
  });
});