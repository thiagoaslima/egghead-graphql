'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');
const { log, warn } = require('../utils');

const PORT = process.env.PORT || 3000;
const server = express();

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

server.use('/graphql', graphqlHTTP({
    schema, 
    graphiql: true,
    rootValue: resolvers
}));

server.listen(PORT, () => console.log(`${(new Date()).toLocaleTimeString()} Listening on http://localhost:${PORT}`));