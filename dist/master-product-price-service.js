'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MasterProductPriceService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MasterProductPriceService = function () {
  function MasterProductPriceService() {
    _classCallCheck(this, MasterProductPriceService);
  }

  _createClass(MasterProductPriceService, null, [{
    key: 'create',
    value: function create(productPrice) {
      return new Promise(function (resolve, reject) {
        _schema.MasterProductPrice.spawn(productPrice.get('masterProductId'), productPrice.get('priceDetails')).save().then(function (result) {
          return resolve(result.id);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'search',
    value: function search(productPrice, includeMasterProductDetails) {
      return new Promise(function (resolve, reject) {
        var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProductPrice);

        if (productPrice.has('masterProductId') && productPrice.get('masterProductId')) {
          query.equalTo('masterProduct', _schema.MasterProduct.createWithoutData(productPrice.get('masterProductId')));
        }

        if (productPrice.has('priceDetails') && productPrice.get('priceDetails')) {
          query.equalTo('priceDetails', productPrice.get('priceDetails'));
        }

        if (includeMasterProductDetails) {
          query.include('masterProduct');
        }

        return query.find().then(function (results) {
          return _immutable2.default.fromJS(results).map(MasterProductPriceService.mapMasterProductPriceToResponseFormat);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'exists',
    value: function exists(productPrice) {
      return new Promise(function (resolve, reject) {
        var query = _microBusinessParseServerCommon.ParseWrapperService.createQuery(_schema.MasterProductPrice);

        if (productPrice.has('masterProductId') && productPrice.get('masterProductId')) {
          query.equalTo('masterProduct', _schema.MasterProduct.createWithoutData(productPrice.get('masterProductId')));
        }

        if (productPrice.has('priceDetails') && productPrice.get('priceDetails')) {
          query.equalTo('priceDetails', productPrice.get('priceDetails'));
        }

        return query.count().then(function (total) {
          return resolve(total > 0);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: 'mapMasterProductPriceToResponseFormat',
    value: function mapMasterProductPriceToResponseFormat(masterProductPrice) {
      return Map({
        id: masterProductPrice.getId(),
        masterProduct: masterProductPrice.getMasterProduct(),
        priceDetails: masterProductPrice.getPriceDetails()
      });
    }
  }]);

  return MasterProductPriceService;
}();

exports.MasterProductPriceService = MasterProductPriceService;
exports.default = MasterProductPriceService;