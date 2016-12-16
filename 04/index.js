'use strict';

const { graphql, buildSchema } = require('graphql');
const { log, warn } = require('../utils');

const schema = buildSchema(`
    type Video {
        id: ID,
        title: String,
        duration: Int,
        watched: Boolean
    }

    type Query {
        video: Video,
        videos: [Video]
    }

    type Schema {
        query: Query
    }
`);

const videoA = {
    id: 'A',
    title: 'video A',
    duration: 120,
    watched: true
};

const videoB = {
    id: 'B',
    title: 'video B',
    duration: 160,
    watched: false
};

const videos = [videoA, videoB];

const resolvers = {
    video: () => ({
        id: '1',
        title: 'Foo',
        duration: 180,
        watched: true
    }),
    videos: () => videos
};

const query = `
    query myThirdQuery {
        videos {
            id,
            title,
            duration,
            watched
        }
    }
`;

graphql(schema, query, resolvers)
    .then(log).catch(warn);