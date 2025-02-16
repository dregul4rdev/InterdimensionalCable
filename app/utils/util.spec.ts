import { validateIndex } from './util';

describe('Example test', () => {
  test('First test', () => {
    const x = 0;
    validateIndex(x, 20);
    expect(x).toBe(0);
  });
});
