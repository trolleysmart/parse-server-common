import {
  Map,
} from 'immutable';
import uuid from 'uuid/v4';
import {
  StoreCrawlerConfiguration,
} from './store-crawler-configuration';

export function createStoreCrawlerConfigurationInfo() {
  return Map({
    key: uuid(),
    config: Map({
      val: uuid(),
    }),
  });
}

export function createStoreCrawlerConfiguration(storeCrawlerConfigurationInfo) {
  return StoreCrawlerConfiguration.spawn(storeCrawlerConfigurationInfo || createStoreCrawlerConfigurationInfo());
}

function expectStoreCrawlerConfigurationInfo(storeCrawlerConfigurationInfo, expectedStoreCrawlerConfigurationInfo) {
  expect(storeCrawlerConfigurationInfo.get('key'))
    .toEqual(expectedStoreCrawlerConfigurationInfo.get('key'));
  expect(storeCrawlerConfigurationInfo.get('config'))
    .toEqual(expectedStoreCrawlerConfigurationInfo.get('config'));
}

describe('constructor', () => {
  test('should set class name', () => {
    expect(createStoreCrawlerConfiguration()
        .className)
      .toBe('StoreCrawlerConfiguration');
  });
});

describe('static public methods', () => {
  test('spawn should set provided info', () => {
    const storeCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();
    const object = createStoreCrawlerConfiguration(storeCrawlerConfigurationInfo);
    const info = object.getInfo();

    expectStoreCrawlerConfigurationInfo(info, storeCrawlerConfigurationInfo);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = StoreCrawlerConfiguration.spawn(createStoreCrawlerConfigurationInfo());

    expect(new StoreCrawlerConfiguration(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = createStoreCrawlerConfiguration();

    expect(new StoreCrawlerConfiguration(object)
        .getId())
      .toBe(object.id);
  });

  test('updateInfo should update object info', () => {
    const object = createStoreCrawlerConfiguration();
    const updatedStoreCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();

    object.updateInfo(updatedStoreCrawlerConfigurationInfo);

    const info = object.getInfo();

    expectStoreCrawlerConfigurationInfo(info, updatedStoreCrawlerConfigurationInfo);
  });

  test('getInfo should return provided info', () => {
    const storeCrawlerConfigurationInfo = createStoreCrawlerConfigurationInfo();
    const object = createStoreCrawlerConfiguration(storeCrawlerConfigurationInfo);
    const info = object.getInfo();

    expect(info.get('id'))
      .toBe(object.getId());
    expectStoreCrawlerConfigurationInfo(info, storeCrawlerConfigurationInfo);
  });
});
