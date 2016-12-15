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

module.exports = {
    curry
}