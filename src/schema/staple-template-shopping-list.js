import Immutable, {
  Map,
} from 'immutable';
import {
  BaseObject,
} from 'micro-business-parse-server-common';

class StapleTemplateShoppingList extends BaseObject {
  static spawn(info) {
    const object = new StapleTemplateShoppingList();

    StapleTemplateShoppingList.updateInfoInternal(object, info);

    return object;
  }

  static updateInfoInternal(object, info) {
    object.set('description', info.get('description'));
    object.set('templates', info.get('templates')
      .toJS());
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
    const templates = Immutable.fromJS(this.getObject()
      .get('templates'));

    return Map({
      id: this.getId(),
      description: this.getObject()
        .get('description'),
      templates,
    });
  }
}

export {
  StapleTemplateShoppingList,
};

export default StapleTemplateShoppingList;
