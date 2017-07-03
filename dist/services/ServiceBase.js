"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServiceBase = function ServiceBase() {
  _classCallCheck(this, ServiceBase);
};

ServiceBase.addStringSearchToQuery = function (conditions, query, columnName, lowerCaseColumnName) {
  if (conditions.has(columnName)) {
    var value = conditions.get(columnName);

    if (value) {
      query.equalTo(lowerCaseColumnName, value.toLowerCase());

      return true;
    }
  }

  if (conditions.has("startsWith_" + columnName)) {
    var _value = conditions.get("startsWith_" + columnName);

    if (_value) {
      query.startsWith(lowerCaseColumnName, _value.toLowerCase());

      return true;
    }
  }

  if (conditions.has("contains_" + columnName)) {
    var _value2 = conditions.get("contains_" + columnName);

    if (_value2) {
      query.contains(lowerCaseColumnName, _value2.toLowerCase());

      return true;
    }
  }

  if (conditions.has("contains_" + columnName + "s")) {
    var values = conditions.get("contains_" + columnName + "s");

    if (values && values.count() === 1) {
      query.contains(lowerCaseColumnName, values.first().toLowerCase());

      return true;
    } else if (values && values.count() > 1) {
      query.matches(lowerCaseColumnName, values.map(function (value) {
        return "(?=.*" + value.toLowerCase() + ")";
      }).reduce(function (reduction, value) {
        return reduction + value;
      }));

      return true;
    }
  }

  return false;
};

exports.default = ServiceBase;