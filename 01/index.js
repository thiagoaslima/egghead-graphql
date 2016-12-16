'use strict';

const { graphql, buildSchema } = require('graphql');
const { log } = require('../utils');

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
    .then(log)
    .catch(log);