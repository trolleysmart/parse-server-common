import Immutable, {
  List,
  Map,
} from 'immutable';
import {
  BaseObject,
} from 'micro-business-parse-server-common';
import {
  StapleTemplate,
} from './staple-temmplate';

class StapleTemplateShoppingList extends BaseObject {
  static spawn(info) {
    const object = new StapleTemplateShoppingList();

    StapleTemplateShoppingList.updateInfoInternal(object, info);

    return object;
  }

  static updateInfoInternal(object, info) {
    object.set('description', info.get('description'));

    if (info.has('stapleTemplateIds')) {
      const stapleTemplateIds = info.get('stapleTemplateIds');

      if (!stapleTemplateIds.isEmpty()) {
        object.set('stapleTemplates', stapleTemplateIds.map(stapleTemplateId => StapleTemplate.createWithoutData(stapleTemplateId))
          .toArray());
      }
    } else if (info.has('stapleTemplates')) {
      const stapleTemplates = info.get('stapleTemplates');

      if (!stapleTemplates.isEmpty()) {
        object.set('stapleTemplates', stapleTemplates.toArray());
      }
    }
  }

  constructor(object) {
    super(object, 'StapleTemplateShoppingList');

    this.updateInfo = this.updateInfo.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  updateInfo(info) {
    const object = this.getObject();

    StapleTemplateShoppingList.updateInfoInternal(object, info);

    return this;
  }

  getInfo() {
    const stapleTemplateObjects = this.getObject()
      .get('stapleTemplates');
    const stapleTemplates = stapleTemplateObjects ? Immutable.fromJS(stapleTemplateObjects)
      .map(stapleTemplate => new StapleTemplate(stapleTemplate)
        .getInfo()) : undefined;

    return Map({
      id: this.getId(),
      description: this.getObject()
        .get('description'),
      stapleTemplates,
      stapleTemplateIds: stapleTemplates ? stapleTemplates.map(stapleTemplate => stapleTemplate.get('id')) : List(),
    });
  }
}

export {
  StapleTemplateShoppingList,
};

export default StapleTemplateShoppingList;
