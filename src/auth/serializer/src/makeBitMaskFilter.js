import JSBI from 'jsbi';

let makeBitMaskFilter = (allowedOperations) => {
  return allowedOperations.reduce(([low, high], allowedOperation) => allowedOperation < 64 ? [JSBI.bitwiseOr(low, JSBI.leftShift(JSBI.BigInt(1), JSBI.BigInt(allowedOperation))), high]
                                                                                           : [low, JSBI.bitwiseOr(high, JSBI.leftShift(JSBI.BigInt(1), JSBI.BigInt(allowedOperation-64)))],
                                  [JSBI.BigInt(0), JSBI.BigInt(0)]).map(value => JSBI.notEqual(value, JSBI.BigInt(0)) ? value.toString() : null);
};

module.exports = makeBitMaskFilter;