function curry(fn, context = null, arity, args) {
    arity = arity || fn.length;
    args = args || [];

    return (...localArgs) => {
        let _arguments = args.concat(localArgs);

        if (_arguments.length >= arity) {
            return fn.apply(context, _arguments);
        } else {
            return curry(fn, context, arity, _arguments);
        }
    };
}

const log = curry((...args) => {
    args = args.map(val => typeof val === 'object' ? JSON.stringify(val) : val);
    console.log(args);
}, console);

const warn = curry((...args) => {
    args = args.map(val => typeof val === 'object' ? JSON.stringify(val) : val);
    console.warn(...args);
}, console);

module.exports = {
    curry,
    log,
    warn
}