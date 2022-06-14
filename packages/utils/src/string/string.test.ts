import { camelCase, pascalCase, slugify } from './string';

describe('utils/string', () => {
  test('camelCase', () => {
    expect(camelCase('background-color')).toEqual('backgroundColor');
    expect(camelCase('-webkit-scrollbar-thumb')).toEqual('WebkitScrollbarThumb');
    expect(camelCase('_hello_world')).toEqual('HelloWorld');
    expect(camelCase('hello_world')).toEqual('helloWorld');
  });

  test('pascalCase', () => {
    expect(pascalCase('hello world')).toEqual('HelloWorld');
    expect(pascalCase('hello.world')).toEqual('HelloWorld');
    expect(pascalCase('foo_bar-baz')).toEqual('FooBarBaz');
  });

  test('slugify', () => {
    expect(slugify('foo bar baz')).toEqual('foo-bar-baz');
    expect(slugify(' foo bar baz ')).toEqual('foo-bar-baz');
    expect(slugify('foo, bar baz')).toEqual('foo-bar-baz');
    expect(slugify('foo- bar baz')).toEqual('foo-bar-baz');
    expect(slugify('foo] bar baz')).toEqual('foo-bar-baz');
    expect(slugify('foo  bar--baz')).toEqual('foo-bar-baz');
    expect(slugify('Foo bAr baZ')).toEqual('foo-bar-baz');
    expect(slugify('unicode ♥ is ☢')).toEqual('unicode-is');
  });
});
