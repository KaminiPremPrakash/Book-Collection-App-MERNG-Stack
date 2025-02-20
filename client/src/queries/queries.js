
import {gql} from 'apollo-boost'

const getAuthorsQuery = gql`
{
    authors{
        name 
        id
    }
}
`

const getBooksQuery = gql`
{
    books{
        name 
        id
    }
}
`

const addBookMutation= gql`
mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name:$name, genre:$genre, authorId:$authorId){
        name 
        id
    }
}
`
const addAuthorMutation= gql`
mutation($name: String!, $age: Int!){
    addAuthor(name:$name, age:$age){
        name 
        age
        id
    }
}
`

const getBookQuery = gql`
    query($id:ID){
        book(id: $id){
           name 
           genre
           author{
               name
               age
               books{
                   name
                   genre
               }
           }
        }
    }
`

export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery, addAuthorMutation };