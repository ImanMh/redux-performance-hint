import {diffDescription, hintOptions, hintUserOptions} from './types';
import { describeDiff } from './describe-diff';

const logUnnecessaryUpdate = (valueA: any, valueB: any, diff :diffDescription) => {
    console.group(`Warning! an unnecessary render detected on ${diff.path.join('.')}. You can improve performance by fixing this issue.`);
    console.log('old state: ', valueA);
    console.log('new state:', valueB);
    console.log(`bad update: ${diff.path.join('.')}`);
    console.groupEnd();
}

const defaultOptions: hintOptions = {
    logger: logUnnecessaryUpdate,
}

export default (valueA: any, valueB: any, userOptions: hintUserOptions = {}): boolean => {
    const diffDescription = describeDiff(valueA, valueB);
    const options: hintOptions = {
      ...defaultOptions,
      ...userOptions,
    };
    if (diffDescription.isEqual) {
        // does not require a re-render
        return true;
    }
    const deepEqual = JSON.stringify(valueA) === JSON.stringify(valueB);
    if (deepEqual) {
        // unnecessary update
        options.logger(valueA, valueB, diffDescription);
    } else {
        // normal healthy update
        return false;
    }
    return false;
};