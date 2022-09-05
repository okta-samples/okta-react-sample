// broadcast-channel should not detect node environment
// https://github.com/pubkey/broadcast-channel/blob/master/src/util.js#L61
process[Symbol.toStringTag] = 'Process';

// solves stacktrace when running tests
// https://github.com/testing-library/react-testing-library/issues/1061#issuecomment-1117450890
global.IS_REACT_ACT_ENVIRONMENT = true
