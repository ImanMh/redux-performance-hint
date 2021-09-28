import reduxPerformanceHints from '../src/index'

describe('initial', () => {
    it('should be able to call', () => {
        expect(typeof reduxPerformanceHints(1, 1)).toEqual('boolean');
    })
});

describe('usage', () => {
    it('no shallow change, no re-render', () => {
        const logger = jest.fn();
        expect(reduxPerformanceHints(
            { a: 1 },
            { a: 1 },
            { logger }
        )).toEqual(true);
        expect(logger).toBeCalledTimes(0);
    })

    it('healthy update', () => {
        const logger = jest.fn();
        expect(reduxPerformanceHints({ a: 1 }, { a: 2 }, { logger })).toEqual(false);
        expect(logger).toBeCalledTimes(0);
    })

    it('unnecessary updates', () => {
        const logger = jest.fn();
        expect(reduxPerformanceHints(
            { a: { b: 1 } },
            { a: { b: 1 } },
            { logger }
        )).toEqual(false);
        expect(logger).toBeCalledTimes(1);
    });
});
