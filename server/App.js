const express = require('express');
//allows express to understand graphQL and interact with it
const { graphqlHTTP }= require('express-graphql')
const schema = require('./schema/schema')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')


//allow cross origin request
app.use(cors());

//connect to db
mongoose.connect('mongodb+srv://kamini:kamini@cluster0.5q3el.mongodb.net/bookpile?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.connection.once('open', ()=>{
    console.log('connected to DB')
})

// graphqlHTTP is a middleware which needs to know how graph looks to navigate node to node
app.use('/graphql', graphqlHTTP({
    //pass the schema here
    schema,
    graphiql: true
}));

app.listen(3000, ()=>{
    console.log('server is running')
});