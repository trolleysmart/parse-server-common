// @flow

import Chance from 'chance';
import Immutable, { List, Map, Range } from 'immutable';
import uuid from 'uuid/v4';
import '../../../bootstrap';
import { UserFeedbackService } from '../';
import { createUserFeedbackInfo, expectUserFeedback } from '../../schema/__tests__/UserFeedback.test';

const chance = new Chance();
const userFeedbackService = new UserFeedbackService();

const createCriteriaWthoutConditions = () =>
  Map({
    fields: List.of('feedback', 'user'),
    include_user: true,
  });

const createCriteria = userFeedback =>
  Map({
    conditions: Map({
      userId: userFeedback ? userFeedback.get('userId') : uuid(),
    }),
  }).merge(createCriteriaWthoutConditions());

const createUserFeedbacks = async (count, useSameInfo = false) => {
  let userFeedback;

  if (useSameInfo) {
    const { userFeedback: tempUserFeedback } = await createUserFeedbackInfo();

    userFeedback = tempUserFeedback;
  }

  return Immutable.fromJS(
    await Promise.all(
      Range(0, count)
        .map(async () => {
          let finalUserFeedback;

          if (useSameInfo) {
            finalUserFeedback = userFeedback;
          } else {
            const { userFeedback: tempUserFeedback } = await createUserFeedbackInfo();

            finalUserFeedback = tempUserFeedback;
          }

          return userFeedbackService.read(await userFeedbackService.create(finalUserFeedback), createCriteriaWthoutConditions());
        })
        .toArray(),
    ),
  );
};

export default createUserFeedbacks;

describe('create', () => {
  test('should return the created user feedback Id', async () => {
    const userFeedbackId = await userFeedbackService.create((await createUserFeedbackInfo()).userFeedback);

    expect(userFeedbackId).toBeDefined();
  });

  test('should create the user feedback', async () => {
    const { userFeedback } = await createUserFeedbackInfo();
    const userFeedbackId = await userFeedbackService.create(userFeedback);
    const fetchedUserFeedback = await userFeedbackService.read(userFeedbackId, createCriteriaWthoutConditions());

    expect(fetchedUserFeedback).toBeDefined();
  });
});

describe('read', () => {
  test('should reject if the provided user feedback Id does not exist', async () => {
    const userFeedbackId = uuid();

    try {
      await userFeedbackService.read(userFeedbackId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No user feedback found with Id: ${userFeedbackId}`);
    }
  });

  test('should read the existing user feedback', async () => {
    const { userFeedback: expectedUserFeedback, user: expectedUser } = await createUserFeedbackInfo();
    const userFeedbackId = await userFeedbackService.create(expectedUserFeedback);
    const userFeedback = await userFeedbackService.read(userFeedbackId, createCriteriaWthoutConditions());

    expectUserFeedback(userFeedback, expectedUserFeedback, { userFeedbackId, expectedUser });
  });
});

describe('update', () => {
  test('should reject if the provided user feedback Id does not exist', async () => {
    const userFeedbackId = uuid();

    try {
      const userFeedback = await userFeedbackService.read(
        await userFeedbackService.create((await createUserFeedbackInfo()).userFeedback),
        createCriteriaWthoutConditions(),
      );

      await userFeedbackService.update(userFeedback.set('id', userFeedbackId));
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No user feedback found with Id: ${userFeedbackId}`);
    }
  });

  test('should return the Id of the updated user feedback', async () => {
    const { userFeedback: expectedUserFeedback } = await createUserFeedbackInfo();
    const userFeedbackId = await userFeedbackService.create((await createUserFeedbackInfo()).userFeedback);
    const id = await userFeedbackService.update(expectedUserFeedback.set('id', userFeedbackId));

    expect(id).toBe(userFeedbackId);
  });

  test('should update the existing user feedback', async () => {
    const { userFeedback: expectedUserFeedback, user: expectedUser } = await createUserFeedbackInfo();
    const userFeedbackId = await userFeedbackService.create((await createUserFeedbackInfo()).userFeedback);

    await userFeedbackService.update(expectedUserFeedback.set('id', userFeedbackId));

    const userFeedback = await userFeedbackService.read(userFeedbackId, createCriteriaWthoutConditions());

    expectUserFeedback(userFeedback, expectedUserFeedback, { userFeedbackId, expectedUser });
  });
});

describe('delete', () => {
  test('should reject if the provided user feedback Id does not exist', async () => {
    const userFeedbackId = uuid();

    try {
      await userFeedbackService.delete(userFeedbackId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No user feedback found with Id: ${userFeedbackId}`);
    }
  });

  test('should delete the existing user feedback', async () => {
    const userFeedbackId = await userFeedbackService.create((await createUserFeedbackInfo()).userFeedback);
    await userFeedbackService.delete(userFeedbackId);

    try {
      await userFeedbackService.delete(userFeedbackId);
    } catch (ex) {
      expect(ex.getErrorMessage()).toBe(`No user feedback found with Id: ${userFeedbackId}`);
    }
  });
});

describe('search', () => {
  test('should return no user feedback if provided criteria matches no user feedback', async () => {
    const userFeedbacks = await userFeedbackService.search(createCriteria());

    expect(userFeedbacks.count()).toBe(0);
  });

  test('should return the user feedback matches the criteria', async () => {
    const { userFeedback: expectedUserFeedback, user: expectedUser } = await createUserFeedbackInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => userFeedbackService.create(expectedUserFeedback)).toArray()),
    );
    const userFeedbacks = await userFeedbackService.search(createCriteria(expectedUserFeedback));

    expect(userFeedbacks.count).toBe(results.count);
    userFeedbacks.forEach((userFeedback) => {
      expect(results.find(_ => _.localeCompare(userFeedback.get('id')) === 0)).toBeDefined();
      expectUserFeedback(userFeedback, expectedUserFeedback, { userFeedbackId: userFeedback.get('id'), expectedUser });
    });
  });
});

describe('searchAll', () => {
  test('should return no user feedback if provided criteria matches no user feedback', async () => {
    let userFeedbacks = List();
    const result = userFeedbackService.searchAll(createCriteria());

    try {
      result.event.subscribe((info) => {
        userFeedbacks = userFeedbacks.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(userFeedbacks.count()).toBe(0);
  });

  test('should return the user feedback matches the criteria', async () => {
    const { userFeedback: expectedUserFeedback, user: expectedUser } = await createUserFeedbackInfo();
    const results = Immutable.fromJS(
      await Promise.all(Range(0, chance.integer({ min: 2, max: 5 })).map(async () => userFeedbackService.create(expectedUserFeedback)).toArray()),
    );

    let userFeedbacks = List();
    const result = userFeedbackService.searchAll(createCriteria(expectedUserFeedback));

    try {
      result.event.subscribe((info) => {
        userFeedbacks = userFeedbacks.push(info);
      });

      await result.promise;
    } finally {
      result.event.unsubscribeAll();
    }

    expect(userFeedbacks.count).toBe(results.count);
    userFeedbacks.forEach((userFeedback) => {
      expect(results.find(_ => _.localeCompare(userFeedback.get('id')) === 0)).toBeDefined();
      expectUserFeedback(userFeedback, expectedUserFeedback, { userFeedbackId: userFeedback.get('id'), expectedUser });
    });
  });
});

describe('exists', () => {
  test('should return false if no user feedback match provided criteria', async () => {
    expect(await userFeedbackService.exists(createCriteria())).toBeFalsy();
  });

  test('should return true if any user feedback match provided criteria', async () => {
    const userFeedbacks = await createUserFeedbacks(chance.integer({ min: 1, max: 10 }), true);

    expect(await userFeedbackService.exists(createCriteria(userFeedbacks.first()))).toBeTruthy();
  });
});

describe('count', () => {
  test('should return 0 if no user feedback match provided criteria', async () => {
    expect(await userFeedbackService.count(createCriteria())).toBe(0);
  });

  test('should return the count of user feedback match provided criteria', async () => {
    const userFeedbacks = await createUserFeedbacks(chance.integer({ min: 1, max: 10 }), true);

    expect(await userFeedbackService.count(createCriteria(userFeedbacks.first()))).toBe(userFeedbacks.count());
  });
});
