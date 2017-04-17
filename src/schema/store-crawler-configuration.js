import Immutable from 'immutable';
import Common from 'micro-business-parse-server-common';

class StoreCrawlerConfiguration extends Common.BaseObject {
  constructor(object) {
    super(object, 'StoreCrawlerConfiguration');

    this.getKey = this.getKey.bind(this);
    this.getConfig = this.getConfig.bind(this);
  }

  static spawn(
    key,
    config,
  ) {
    const object = new StoreCrawlerConfiguration();

    object.set('key', key);
    object.set('config', config);

    return object;
  }

  getKey() {
    return this.getObject()
      .get('key');
  }

  getConfig() {
    return Immutable.fromJS(this.getObject()
      .get('config'));
  }
}

export default StoreCrawlerConfiguration;
