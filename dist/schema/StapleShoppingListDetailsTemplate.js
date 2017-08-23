'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _microBusinessParseServerCommon = require('micro-business-parse-server-common');

var _StapleTemplate = require('./StapleTemplate');

var _StapleTemplate2 = _interopRequireDefault(_StapleTemplate);

var _Tag = require('./Tag');

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass);
}

var StapleShoppingListDetailsTemplate = (function(_BaseObject) {
  _inherits(StapleShoppingListDetailsTemplate, _BaseObject);

  function StapleShoppingListDetailsTemplate(object) {
    _classCallCheck(this, StapleShoppingListDetailsTemplate);

    var _this = _possibleConstructorReturn(
      this,
      (StapleShoppingListDetailsTemplate.__proto__ || Object.getPrototypeOf(StapleShoppingListDetailsTemplate))
        .call(this, object, 'StapleShoppingListDetailsTemplate'),
    );

    _initialiseProps.call(_this);

    return _this;
  }

  return StapleShoppingListDetailsTemplate;
})(_microBusinessParseServerCommon.BaseObject);

StapleShoppingListDetailsTemplate.spawn = function(info) {
  var object = new StapleShoppingListDetailsTemplate();

  StapleShoppingListDetailsTemplate.updateInfoInternal(object, info);

  return object;
};

StapleShoppingListDetailsTemplate.updateInfoInternal = function(object, info) {
  object.set('name', info.get('name'));
  object.set('description', info.get('description'));
  object.set('imageUrl', info.get('imageUrl'));

  if (info.has('stapleTemplateIds')) {
    var stapleTemplateIds = info.get('stapleTemplateIds');

    if (stapleTemplateIds.isEmpty()) {
      object.set('stapleTemplates', []);
    } else {
      object.set(
        'stapleTemplates',
        stapleTemplateIds
          .map(function(stapleTemplateId) {
            return _StapleTemplate2.default.createWithoutData(stapleTemplateId);
          })
          .toArray(),
      );
    }
  } else if (info.has('stapleTemplates')) {
    var stapleTemplates = info.get('stapleTemplates');

    if (stapleTemplates.isEmpty()) {
      object.set('stapleTemplates', []);
    } else {
      object.set('stapleTemplates', stapleTemplates.toArray());
    }
  }

  if (info.has('tagIds')) {
    var tagIds = info.get('tagIds');

    if (tagIds.isEmpty()) {
      object.set('tags', []);
    } else {
      object.set(
        'tags',
        tagIds
          .map(function(tagId) {
            return _Tag2.default.createWithoutData(tagId);
          })
          .toArray(),
      );
    }
  } else if (info.has('tags')) {
    var tags = info.get('tags');

    if (tags.isEmpty()) {
      object.set('tags', []);
    } else {
      object.set('tags', tags.toArray());
    }
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateInfo = function(info) {
    var object = _this2.getObject();

    StapleShoppingListDetailsTemplate.updateInfoInternal(object, info);

    return _this2;
  };

  this.getInfo = function() {
    var stapleTemplateObjects = _this2.getObject().get('stapleTemplates');
    var stapleTemplates = stapleTemplateObjects
      ? _immutable2.default.fromJS(stapleTemplateObjects).map(function(stapleTemplate) {
          return new _StapleTemplate2.default(stapleTemplate).getInfo();
        })
      : undefined;
    var tagObjects = _this2.getObject().get('tags');
    var tags = tagObjects
      ? _immutable2.default.fromJS(tagObjects).map(function(tag) {
          return new _Tag2.default(tag).getInfo();
        })
      : undefined;

    return (0, _immutable.Map)({
      id: _this2.getId(),
      name: _this2.getObject().get('name'),
      description: _this2.getObject().get('description'),
      imageUrl: _this2.getObject().get('imageUrl'),
      stapleTemplates: stapleTemplates,
      stapleTemplateIds: stapleTemplates
        ? stapleTemplates.map(function(stapleTemplate) {
            return stapleTemplate.get('id');
          })
        : (0, _immutable.List)(),
      tags: tags,
      tagIds: tags
        ? tags.map(function(tag) {
            return tag.get('id');
          })
        : (0, _immutable.List)(),
    });
  };
};

exports.default = StapleShoppingListDetailsTemplate;
