import { sleep, to } from './promise';

describe('utils/misc', () => {
  test('async await', async () => {
    const start = performance.now();
    await sleep(20);
    expect(performance.now() - start).toBeGreaterThanOrEqual(19);
  });

  it('should return a value when resolved', async () => {
    const testInput = 41;
    const promise = Promise.resolve(testInput);

    const [err, data] = await to<number>(promise);

    expect(err).toBeNull();
    expect(data).toEqual(testInput);
  });

  it('should return an error when promise is rejected', async () => {
    const promise = Promise.reject('Error');

    const [err, data] = await to<number>(promise);

    expect(err).toEqual('Error');
    expect(data).toBeUndefined();
  });

  it('should receive the type of the parent if no type was passed', async () => {
    const [, user] = await to<{ name: string }>(Promise.resolve({ name: 'userName' }));

    expect(user?.name).toEqual('userName');
  });
});
