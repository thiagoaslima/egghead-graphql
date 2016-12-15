'use strict';

const { graphql, buildSchema } = require('graphql');
const { curry } = require('../utils');

function f(a, b, c) {
    console.log(a, b, c);
}

const schema = buildSchema(`
    type Query {
        foo: String
    }

    type Schema {
        query: Query
    }
`);

const resolvers = {
    foo: () => 'bar'
};

const query = `
    query myFirstQuery {
        foo
    }
`;

graphql(schema, query, resolvers)
    .then(result => console.log(result))
    .catch(err => console.error(err));