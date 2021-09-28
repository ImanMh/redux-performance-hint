import { describeDiff } from '../src/describe-diff';

describe('initial', () => {
  it('should be able to call', () => {
    expect(typeof describeDiff('a', 'b').isEqual).toEqual('boolean');
  });
});

describe('primitives', () => {
  it('should be able to calculate primitives change', () => {
    expect(describeDiff(1, 1).isEqual).toEqual(true);
    expect(describeDiff(1, 2).isEqual).toEqual(false);
  });

  it('should be able to calculate primitives path', () => {
    expect(describeDiff(1, 2).path).toEqual([]);
    expect(describeDiff(1, 1).path).toEqual([]);
  });
});

describe('objects', () => {
  it('ignore root ref changes if depth is 0', () => {
    const result = describeDiff({}, {});
    expect(result.isEqual).toEqual(true);
    expect(result.path).toEqual([]);

    const result2 = describeDiff(null, {});
    expect(result2.isEqual).toEqual(false);
  });
});

describe('depth 1', () => {
  it('a primitive change', () => {
    expect(describeDiff({ a: 1 }, { a: 2 }).isEqual).toEqual(false);
    expect(describeDiff({ a: 1 }, { a: 2 }).path).toEqual(['a']);
  });

  it('a primitive not isEqual', () => {
    expect(describeDiff({ a: null }, { a: null }).isEqual).toEqual(true);
    expect(describeDiff({ a: null }, { a: null }).path).toEqual([]);
  });

  it('an object change', () => {
    expect(describeDiff({ a: {} }, { a: {} }).isEqual).toEqual(false);
    expect(describeDiff({ a: {} }, { a: {} }).path).toEqual(['a']);
  });
});

describe('arrays', () => {
  it('not changed change', () => {
    expect(describeDiff([1, 2] , [1, 2]).isEqual).toEqual(true);
    expect(describeDiff([1, 2], [1, 2]).path).toEqual([]);
  });

  it('a primitive change', () => {
    expect(describeDiff([1, 2] , [1, 3]).isEqual).toEqual(false);
    expect(describeDiff([1, 2], [1, 3]).path).toEqual(['1']);
  });

  it('an object change', () => {
    expect(describeDiff([1, {}] , [1, {}]).isEqual).toEqual(false);
    expect(describeDiff([1, {}], [1, {}]).path).toEqual(['1']);
  });
});


describe('deeper diff checks', () => {
  it('deep primitive not isEqual', () => {
    const innerObj = { a: 1 };
    expect(describeDiff({ a: innerObj }, { a: innerObj }).isEqual).toEqual(true);
    expect(describeDiff({ a: innerObj }, { a: innerObj }).path).toEqual([]);
  });

  it('deep object isEqual', () => {
    const objA = { a: 1, b: {} };
    const objB = { a: 1, b: {} };
    expect(describeDiff(objA, objB, [], 0).isEqual).toEqual(false);
    expect(describeDiff(objA, objB, [], 0).path).toEqual(['b']);
  });
});

