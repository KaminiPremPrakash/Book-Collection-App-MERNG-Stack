//this schema will describe 3 types of data of graph as below
// 1. object types, 
// 2. between objects
// 3. define queries
//we have books and Author objects
const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book')
const Author = require('../models/author')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull} = graphql;

const BookType = new GraphQLObjectType({
name :'Book',
fields:()=>({
    id: { type: GraphQLID},
    name: {type: GraphQLString },
    genre: {type: GraphQLString },
    author:{
        type: AuthorType,
        resolve(parent, args){
            //code to get data from db/other source
            // return _.find(authors, {id:parent.authorId});
            return Author.findById(parent.authorId);
        }
    }
})
});


const AuthorType = new GraphQLObjectType({
    name :'Author',
    fields:()=>({
        id: { type: GraphQLID},
        age: {type: GraphQLInt },
        name: {type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return _.filter(books, {
                //     authorId: parent.id
                // })
                return Book.find({authorId: parent.id})
            }
        }
    })
    });
    
// to jump into graph to grab an author, a book, all authors, all books
const RootQuery = new GraphQLObjectType({
    name :'RootQueryType',
    fields:{
        book:{
            type: BookType, 
            //user will pass the args to get a specific book
            args:{id:{type: GraphQLID}},
            //resolve fires after the book query is run and returns a response
            resolve(parent, args){
                //code to get data from db/other source
                // return _.find(books, {id:args.id});
                return Book.findById(args.id)
            }
        },
        author:{
            type: AuthorType, 
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
                // return _.find(authors, {id:args.id});
                return Author.findById(args.id)
            }
        },
        books:{
            type: new GraphQLList(BookType), 
            resolve(parent, args){
                return Book.find({})
            }
        },
        authors:{
            type: new GraphQLList(AuthorType), 
            resolve(parent, args){
                return Author.find({})
            }
        }
    }
    });


    const Mutation = new GraphQLObjectType({
        name: 'mutation',
        fields:{
            addAuthor:{
                type: AuthorType,
                args:{
                    name: {type: new GraphQLNonNull(GraphQLString)},
                    age:{ type: new GraphQLNonNull(GraphQLInt)}
                },
                resolve(parent, args){
                    let author = new Author({
                        name: args.name,
                        age: args.age
                    });
                    return author.save();
                }
            },
            addBook:{
                type: BookType,
                args:{
                    name: {type: new GraphQLNonNull(GraphQLString)},
                    genre:{ type: new GraphQLNonNull(GraphQLString)},
                    authorId:{ type: new GraphQLNonNull(GraphQLID)},
                },
                resolve(parent, args){
                    let book = new Book({
                        name: args.name,
                        genre: args.genre,
                        authorId: args.authorId
                    });
                    return book.save();
                }
            }
        }
    })

    module.exports= new GraphQLSchema({
        query: RootQuery,
        mutation: Mutation
    })