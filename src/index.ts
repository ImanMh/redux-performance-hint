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
  let isEqual;
  if (isReferenceType(valueA) && isReferenceType(valueB)) {
    if (depth === 0) {
      const valueAKeys = Object.keys(valueA);
      let foundDiff = null;
      for (let i = 0; i < valueAKeys.length; i++) {
        const currentKey = valueAKeys[i];
        const diffDescription= describeDiff(valueA[currentKey], valueB[currentKey], path.concat([currentKey]), depth + 1);
        if (!diffDescription.isEqual) {
          foundDiff = diffDescription;
          break;
        }
      }
      if (foundDiff) {
        return foundDiff;
      }
      isEqual = true;
    } else {
      isEqual = valueA === valueB;
    }
  } else {
    isEqual = valueA === valueB;
  }

  return {
    isEqual,
    path: path,
  }
}
