const {GraphQLServer} = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length;

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => links.find(link => link.id === args.id)
    },
    Mutation: {
        post: (parents, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink(parents, args) {
            const updateLink = links.find(link => link.id === args.id);
            updateLink.url = args.url
            updateLink.description = args.description
            return updateLink
        },
        deleteLink(parents, args) {
            const deleteLink = links.find(link => link.id === args.id);
            links = links.filter(link => link.id !== args.id);
            return deleteLink
        }

    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
});

server.start(() => console.log(`Server is running`))