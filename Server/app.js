const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross origin request
app.use(cors()); 

//connect to monngodb atlast database
mongoose.connect('mongodb+srv://sandipdust:test1234@atlascluster.mvxrj3p.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open',() =>{
    console.log('connected to database');
})



app.use('/graphql',graphqlHTTP({
    schema, 
    graphiql: true
}));

app.listen('4000', ()=>{
    console.log("listening on port 4000");
})
