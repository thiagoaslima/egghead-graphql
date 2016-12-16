'use strict';

const { graphql, buildSchema } = require('graphql');
const { log } = require('../utils');

const schema = buildSchema(`
    type Video {
        id: ID,
        title: String,
        duration: Int,
        watched: Boolean
    }

    type Query {
        video: Video
    }

    type Schema {
        query: Query
    }
`);

const resolvers = {
    video: () => ({
        id: '1',
        title: 'Foo',
        duration: 180,
        watched: true
    })
};

const query = `
    query myThirdQuery {
        video {
            id,
            title,
            duration,
            watched
        }
    }
`;

graphql(schema, query, resolvers)
    .then(log)
    .catch(log);