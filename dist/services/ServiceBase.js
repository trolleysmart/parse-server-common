'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServiceBase = function ServiceBase() {
  _classCallCheck(this, ServiceBase);
};

ServiceBase.splitIntoChunks = function (list, chunkSize) {
  return (0, _immutable.Range)(0, list.count(), chunkSize).map(function (chunkStart) {
    return list.slice(chunkStart, chunkStart + chunkSize);
  });
};

ServiceBase.addStringSearchToQuery = function (conditions, query, conditionPropKey, columnName) {
  if (conditions.has(conditionPropKey)) {
    var value = conditions.get(conditionPropKey);

    if (value) {
      query.equalTo(columnName, value.toLowerCase());

      return true;
    }
  }

  if (conditions.has('startsWith_' + conditionPropKey)) {
    var _value = conditions.get('startsWith_' + conditionPropKey);

    if (_value) {
      query.startsWith(columnName, _value.toLowerCase());

      return true;
    }
  }

  if (conditions.has('contains_' + conditionPropKey)) {
    var _value2 = conditions.get('contains_' + conditionPropKey);

    if (_value2) {
      query.contains(columnName, _value2.toLowerCase());

      return true;
    }
  }

  if (conditions.has('contains_' + conditionPropKey + 's')) {
    var values = conditions.get('contains_' + conditionPropKey + 's');

    if (values && values.count() === 1) {
      query.contains(columnName, values.first().toLowerCase());

      return true;
    } else if (values && values.count() > 1) {
      query.matches(columnName, values.map(function (value) {
        return '(?=.*' + value.toLowerCase() + ')';
      }).reduce(function (reduction, value) {
        return reduction + value;
      }));

      return true;
    }
  }

  return false;
};

exports.default = ServiceBase;