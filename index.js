const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { resolvers } = require("./resolvers.js");
const { typeDefs } = require("./models/typeDefs.js");
const mongoose = require("mongoose");

const server = new ApolloServer({ typeDefs, resolvers });
MONGO_URI =
  "mongodb+srv://brienaustinclayton:es5CO6jSeqflRp8f@cluster0.arauhgy.mongodb.net/?retryWrites=true&w=majority";

try {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB ");
} catch (error) {
  console.log("Error connecting to MongoDB", error);
}

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
