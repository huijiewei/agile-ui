import { isArray, isNumber, isObject } from '../index';

test('is number', () => {
  expect(isNumber(1.2)).toBeTruthy();
  expect(isNumber('20')).toBeFalsy();
});

test('is object', () => {
  expect(isObject([])).toBeFalsy();
  expect(isObject({})).toBeTruthy();
});

test('is array', () => {
  expect(isArray([1])).toBeTruthy();
});
