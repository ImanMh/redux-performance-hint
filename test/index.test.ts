import { describeDiff } from '../src';

describe('content equal init', () => {
  it('should be able to call', () => {
    expect(typeof describeDiff('a', 'b').changed).toEqual('boolean');
  });
});

describe('primitives', () => {
  it('should be able to calculate primitives change', () => {
    expect(describeDiff(1, 1).changed).toEqual(false);
    expect(describeDiff(1, 2).changed).toEqual(true);
  });

  it('should be able to calculate primitives path', () => {
    expect(describeDiff(1, 2).path).toEqual([]);
    expect(describeDiff(1, 1).path).toEqual([]);
  });
});

describe('objects', () => {
  it('ignore root ref changes if depth is 0', () => {
    const result = describeDiff({}, {});
    expect(result.changed).toEqual(false);
    expect(result.path).toEqual([]);

    const result2 = describeDiff(null, {});
    expect(result2.changed).toEqual(true);
  });
});

describe('depth 1', () => {
  it('a primitive change', () => {
    expect(describeDiff({ a: 1 }, { a: 2 }).changed).toEqual(true);
    expect(describeDiff({ a: 1 }, { a: 2 }).path).toEqual(['a']);
  });

  it('a primitive not changed', () => {
    expect(describeDiff({ a: null }, { a: null }).changed).toEqual(false);
    expect(describeDiff({ a: null }, { a: null }).path).toEqual([]);
  });

  it('an object change', () => {
    expect(describeDiff({ a: {} }, { a: {} }).changed).toEqual(true);
    expect(describeDiff({ a: {} }, { a: {} }).path).toEqual(['a']);
  });

});

describe('deeper diff checks', () => {
  it('deep primitive not changed', () => {
    const innerObj = { a: 1 };
    expect(describeDiff({ a: innerObj }, { a: innerObj }).changed).toEqual(false);
    expect(describeDiff({ a: innerObj }, { a: innerObj }).path).toEqual([]);
  });

  it('deep object changed', () => {
    const objA = { a: 1, b: {} };
    const objB = { a: 1, b: {} };
    expect(describeDiff(objA, objB, [], 0).changed).toEqual(true);
    expect(describeDiff(objA, objB, [], 0).path).toEqual(['b']);
  });
});

