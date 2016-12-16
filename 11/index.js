'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInputObjectType,
} = require('graphql');
const { getVideos, getVideoById, createVideo } = require('./src/data/data.js');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
    name: 'Video',
    description: 'A video on Egghead.io',
    fields: {
        id: {
            type: GraphQLID,
            description: 'The id of the video.'
        },
        title: {
            type: GraphQLString,
            description: 'The title of the video.'
        },
        duration: {
            type: GraphQLInt,
            description: 'The duration of the video (in seconds).'
        },
        watched: {
            type: GraphQLBoolean,
            description: 'Whether or not the viewer has watched the video.'
        },
    }
});

const queryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type.',
    fields: {
        video: {
            type: videoType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'The id of the video'
                }
            },
            resolve: (_, args) => getVideoById(args.id)
        },
        videos: {
            type: new GraphQLList(videoType),
            resolve: () => getVideos()
        }
    }
});

const videoInputType = new GraphQLInputObjectType({
    name: 'VideoInput',
    fields: {
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'title'
        },
        duration: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'duration'
        },
        watched: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: 'watched'
        }
    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'root Mutation',
    fields: {
        createVideo: {
            type: videoType,
            args: {
                video: {
                    type: new GraphQLNonNull(videoInputType)
                }
            },
            resolve: (_, args) => createVideo(args.video)
        }
    }

});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});


server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

server.listen(PORT, () => console.log(`${(new Date()).toLocaleTimeString()} Listening on http://localhost:${PORT}`));