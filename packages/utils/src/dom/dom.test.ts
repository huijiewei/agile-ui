import { ariaAttr, dataAttr } from './dom';
import { describe, test, expect } from 'vitest';

describe('utils/dom', () => {
  test('should return data attribute value from boolean', () => {
    const isActive = true;
    expect(dataAttr(isActive)).toBe('');
  });

  test('should return aria attribute value from boolean', () => {
    const isDisabled = false;
    expect(ariaAttr(isDisabled)).toBeUndefined();
  });
});
