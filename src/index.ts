import { diffDescription } from './types';

/*
if (shallowEqual !== describeDiff.found)

const inner = {x: 1, y: 2}
const objA = { a: inner, b: [1, 2]}
const objB = { a: inner, b: [1, 2]}

describeDiff(objA.a, objB.a);
describeDiff(objA.b, objB.b);

{ found: false, path: [], value: null }
{ found: true, path: ['b'], value: [1, 2] }

an issue was detect during compare. Key 'b' on objects contain the same values but references are difference. mismatch was: b: [1,2].
 */
const isReferenceType = (input: any) => input === Object(input);

export const describeDiff = (valueA: any, valueB: any, path: string[] = [], depth = 0): diffDescription => {
  let changed;
  if (isReferenceType(valueA) && isReferenceType(valueB)) {
    if (depth === 0) {
      const valueAKeys = Object.keys(valueA);
      let foundDiff = null;
      for (let i = 0; i < valueAKeys.length; i++) {
        const currentKey = valueAKeys[i];
        const diffDescription= describeDiff(valueA[currentKey], valueB[currentKey], path.concat([currentKey]), depth + 1);
        if (diffDescription.changed) {
          foundDiff = diffDescription;
          break;
        }
      }
      if (foundDiff) {
        return {
          changed: foundDiff.changed,
          path: foundDiff.path,
          value: { previous: valueA, next: valueB }
        };
      }
      changed = false;
    } else {
      //should fail if valueA !== valueB replaced with true.
      changed = valueA !== valueB;
    }
  } else {
    changed = valueA !== valueB;
  }

  return {
    changed,
    path: path,
    value: { previous: valueA, next: valueB },
  }
}
