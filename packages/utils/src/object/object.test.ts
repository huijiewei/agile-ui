import { omit, pick, split } from '../index';

const obj = { a: 1, b: 2, c: { d: 3 } };

test('should return object with omitted property', () => {
  expect(omit(obj, ['a'])).toStrictEqual({ b: 2, c: { d: 3 } });
});

test('should return property in object with specified key', () => {
  expect(pick(obj, ['a'])).toStrictEqual({ a: 1 });
});

test('should split object by key and return array of split objects', () => {
  expect(split(obj, ['a'])).toStrictEqual([{ a: 1 }, { b: 2, c: { d: 3 } }]);
});
