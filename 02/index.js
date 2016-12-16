'use strict';

const { graphql, buildSchema } = require('graphql');
const { log } = require('../utils');

const schema = buildSchema(`
    type Query {
        id: ID,
        title: String,
        duration: Int,
        watched: Boolean
    }

    type Schema {
        query: Query
    }
`);

const resolvers = {
    id: () => '1',
    title: () => 'bar',
    duration: () => 180,
    watched: () => true
};

const query = `
    query mySecondQuery {
        id,
        title,
        duration,
        watched
    }
`;

graphql(schema, query, resolvers)
    .then(log)
    .catch(log);