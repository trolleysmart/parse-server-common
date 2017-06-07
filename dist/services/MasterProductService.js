'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('../schema');

var _NewSearchResultReceivedEvent = require('./NewSearchResultReceivedEvent');

var _NewSearchResultReceivedEvent2 = _interopRequireDefault(_NewSearchResultReceivedEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MasterProductService = function MasterProductService() {
  _classCallCheck(this, MasterProductService);
};

MasterProductService.create = function (info) {
  return new Promise(function (resolve, reject) {
    _schema.MasterProduct.spawn(info).save().then(function (result) {
      return resolve(result.id);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

MasterProductService.read = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No master product found with Id: ' + id);
      } else {
        resolve(new _schema.MasterProduct(results[0]).getInfo());
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

MasterProductService.update = function (info) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct).equalTo('objectId', info.get('id')).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No master product found with Id: ' + info.get('id'));
      } else {
        var object = new _schema.MasterProduct(results[0]);

        object.updateInfo(info).saveObject().then(function () {
          return resolve(object.getId());
        }).catch(function (error) {
          return reject(error);
        });
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

MasterProductService.delete = function (id) {
  return new Promise(function (resolve, reject) {
    _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct).equalTo('objectId', id).limit(1).find().then(function (results) {
      if (results.length === 0) {
        reject('No master product found with Id: ' + id);
      } else {
        results[0].destroy().then(function () {
          return resolve();
        }).catch(function (error) {
          return reject(error);
        });
      }
    }).catch(function (error) {
      return reject(error);
    });
  });
};

MasterProductService.search = function (criteria) {
  return new Promise(function (resolve, reject) {
    return MasterProductService.buildSearchQuery(criteria).find().then(function (results) {
      return resolve(_immutable2.default.fromJS(results).map(function (_) {
        return new _schema.MasterProduct(_).getInfo();
      }));
    }).catch(function (error) {
      return reject(error);
    });
  });
};

MasterProductService.searchAll = function (criteria) {
  var event = new _NewSearchResultReceivedEvent2.default();
  var promise = MasterProductService.buildSearchQuery(criteria).each(function (_) {
    return event.raise(new _schema.MasterProduct(_).getInfo());
  });

  return {
    event: event,
    promise: promise
  };
};

MasterProductService.exists = function (criteria) {
  return new Promise(function (resolve, reject) {
    return MasterProductService.buildSearchQuery(criteria).count().then(function (total) {
      return resolve(total > 0);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

MasterProductService.buildSearchQuery = function (criteria) {
  var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProduct, criteria);

  if (criteria.has('includeTags')) {
    var value = criteria.get('includeTags');

    if (value) {
      query.include('tags');
    }
  }

  if (!criteria.has('conditions')) {
    return query;
  }

  var conditions = criteria.get('conditions');

  if (conditions.has('description')) {
    var _value = conditions.get('description');

    if (_value) {
      query.equalTo('lowerCaseDescription', _value.toLowerCase());
    }
  }

  if (conditions.has('startsWith_description')) {
    var _value2 = conditions.get('startsWith_description');

    if (_value2) {
      query.startsWith('lowerCaseDescription', _value2.toLowerCase());
    }
  }

  if (conditions.has('contains_description')) {
    var _value3 = conditions.get('contains_description');

    if (_value3) {
      query.contains('lowerCaseDescription', _value3.toLowerCase());
    }
  }

  if (conditions.has('contains_descriptions')) {
    var values = conditions.get('contains_descriptions');

    if (values && values.count() === 1) {
      query.contains('lowerCaseDescription', values.first().toLowerCase());
    } else if (values && values.count() > 1) {
      query.matches('lowerCaseDescription', values.map(function (value) {
        return '(?=.*' + value.toLowerCase() + ')';
      }).reduce(function (reduction, value) {
        return reduction + value;
      }));
    }
  }

  if (conditions.has('barcode')) {
    var _value4 = conditions.get('barcode');

    if (_value4) {
      query.equalTo('barcode', _value4);
    }
  }

  if (conditions.has('imageUrl')) {
    var _value5 = conditions.get('imageUrl');

    if (_value5) {
      query.equalTo('imageUrl', _value5);
    }
  }

  if (conditions.has('tag')) {
    var _value6 = conditions.get('tag');

    if (_value6) {
      query.equalTo('tags', _value6);
    }
  }

  if (conditions.has('tags')) {
    var _value7 = conditions.get('tags');

    if (_value7) {
      query.containedIn('tags', _value7.toArray());
    }
  }

  if (conditions.has('tagId')) {
    var _value8 = conditions.get('tagId');

    if (_value8) {
      query.equalTo('tags', _schema.Tag.createWithoutData(_value8));
    }
  }

  if (conditions.has('tagIds')) {
    var _value9 = conditions.get('tagIds');

    if (_value9) {
      query.containedIn('tags', _value9.map(function (tagId) {
        return _schema.Tag.createWithoutData(tagId);
      }).toArray());
    }
  }

  return query;
};

exports.default = MasterProductService;