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

  it('should be able to calculate primitives value', () => {
    expect(describeDiff(1, 2).value.previous).toEqual(1);
    expect(describeDiff(1, 2).value.next).toEqual(2);
  });
});

describe('objects', () => {
  it('ignore root ref changes if depth is 0', () => {
    const result = describeDiff({}, {});
    expect(result.changed).toEqual(false);
    expect(result.path).toEqual([]);
    expect(result.value.previous).toEqual({});
    expect(result.value.next).toEqual({});

    const result2 = describeDiff(null, {});
    expect(result2.changed).toEqual(true);
  });
});

describe('depth 1', () => {
  it('a primitive change', () => {
    expect(describeDiff({ a: 1 }, { a: 2 }).changed).toEqual(true);
    expect(describeDiff({ a: 1 }, { a: 2 }).value).toEqual({ previous: { a: 1 }, next: { a: 2 } });
    expect(describeDiff({ a: 1 }, { a: 2 }).path).toEqual(['a']);
  });

  it('a primitive not changed', () => {
    expect(describeDiff({ a: null }, { a: null }).changed).toEqual(false);
    expect(describeDiff({ a: null }, { a: null }).value).toEqual({ previous: { a: null }, next: { a: null } });
    expect(describeDiff({ a: null }, { a: null }).path).toEqual([]);
  });

  it('an object change', () => {
    expect(describeDiff({ a: {} }, { a: {} }).changed).toEqual(true);
    expect(describeDiff({ a: {} }, { a: {} }).value).toEqual({ previous: { a: {} }, next: { a: {} } });
    expect(describeDiff({ a: {} }, { a: {} }).path).toEqual(['a']);
  });

});

describe('path', () => {
  it.skip('should concat if path is given', () => {
    expect(describeDiff({}, {}, ['prevPath']).path.length).toEqual(1);
  });

  it.skip('should build path, is inequality is detected', () => {
    const objA = {x: 1, y: null};
    const objB = {x: 1, y: null};
    // expect(findRefChanges(objA, objB).path.length).toEqual(1);
    expect(describeDiff(objA, objB).path.length).toEqual(0);
  });
});

