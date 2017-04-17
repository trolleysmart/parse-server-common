import Immutable from 'immutable';
import uuid from 'uuid/v4';
import StoreCrawlerConfiguration from './store-crawler-configuration';

describe('constructor', () => {
  test('should set class name', () => {
    expect(StoreCrawlerConfiguration.spawn('key', 'config')
        .className)
      .toBe('StoreCrawlerConfiguration');
  });
});

describe('static public methods', () => {
  test('spawn should set provided key', () => {
    const expectedValue = uuid();

    expect(StoreCrawlerConfiguration.spawn(expectedValue, 'config')
        .get('key'))
      .toBe(expectedValue);
  });

  test('spawn should set provided config', () => {
    const expectedValue = uuid();

    expect(StoreCrawlerConfiguration.spawn('key', expectedValue)
        .get('config'))
      .toBe(expectedValue);
  });
});

describe('public methods', () => {
  test('getObject should return provided object', () => {
    const object = StoreCrawlerConfiguration.spawn('key', 'config');

    expect(new StoreCrawlerConfiguration(object)
        .getObject())
      .toBe(object);
  });

  test('getId should return provided object Id', () => {
    const object = StoreCrawlerConfiguration.spawn('key', 'config');

    expect(new StoreCrawlerConfiguration(object)
        .getId())
      .toBe(object.id);
  });

  test('getKey should return provided key', () => {
    const expectedValue = uuid();
    const object = StoreCrawlerConfiguration.spawn(expectedValue, 'config');

    expect(new StoreCrawlerConfiguration(object)
        .getKey())
      .toBe(expectedValue);
  });

  test('getConfig should return provided config', () => {
    const expectedValue = Immutable.fromJS({
      val: uuid(),
    });
    const object = StoreCrawlerConfiguration.spawn('key', expectedValue);

    expect(new StoreCrawlerConfiguration(object)
        .getConfig())
      .toBe(expectedValue);
  });
});
