import { isBoolean, isFunction, isNumber, isObject, isString } from './assertion';
import { describe, test, expect } from 'vitest';

describe('utils/assertion', () => {
  test('isBoolean', () => {
    expect(isBoolean(true)).toBeTruthy();
    expect(isBoolean(false)).toBeTruthy();

    expect(isBoolean(0)).toBeFalsy();
    expect(isBoolean('')).toBeFalsy();
    expect(isBoolean([])).toBeFalsy();
  });

  test('isNumber', () => {
    expect(isNumber(1)).toBeTruthy();
    expect(isNumber(1.2)).toBeTruthy();
    expect(isNumber(Infinity)).toBeTruthy();
    expect(isNumber(NaN)).toBeTruthy();

    expect(isNumber('10')).toBeFalsy();
    expect(isNumber({})).toBeFalsy();
  });

  test('isString', () => {
    expect(isString('1')).toBeTruthy();
    expect(isString(String('1'))).toBeTruthy();

    expect(isString(1)).toBeFalsy();
    expect(isString({})).toBeFalsy();
  });

  test('isObject', () => {
    expect(isObject({})).toBeTruthy();
    expect(isObject([])).toBeTruthy();
    expect(isObject(new RegExp(''))).toBeTruthy();
    expect(isObject(new Date())).toBeTruthy();

    expect(isObject(null)).toBeFalsy();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isObject(function foo() {})).toBeFalsy();
    expect(isObject(123)).toBeFalsy();
  });

  test('isFunction', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isFunction(function foo() {})).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(isFunction(() => {})).toBeTruthy();

    expect(isFunction({})).toBeFalsy();
    expect(isFunction(1)).toBeFalsy();
  });
});
