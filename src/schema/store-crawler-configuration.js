import Immutable, {
  Map,
} from 'immutable';
import {
  BaseObject,
} from 'micro-business-parse-server-common';

class StoreCrawlerConfiguration extends BaseObject {
  static spawn(info) {
    const object = new StoreCrawlerConfiguration();

    StoreCrawlerConfiguration.updateInfoInternal(object, info);

    return object;
  }

  static updateInfoInternal(object, info) {
    object.set('key', info.get('key'));
    object.set('config', info.get('config').toJS());
  }

  constructor(object) {
    super(object, 'StoreCrawlerConfiguration');

    this.updateInfo = this.updateInfo.bind(this);
    this.getInfo = this.getInfo.bind(this);
  }

  updateInfo(info) {
    const object = this.getObject();

    StoreCrawlerConfiguration.updateInfoInternal(object, info);

    return this;
  }

  getInfo() {
    return Map({
      id: this.getId(),
      key: this.getObject()
        .get('key'),
      config: Immutable.fromJS(this.getObject()
        .get('config')),
    });
  }
}

export {
  StoreCrawlerConfiguration,
};

export default StoreCrawlerConfiguration;
