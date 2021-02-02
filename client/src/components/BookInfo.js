import React, { Component} from 'react'
//binds apollo to react
import { graphql} from 'react-apollo'
import {getBookQuery} from '../queries/queries'

class BookInfo extends Component {
  
    displayBookInfo(){
        const { book } = this.props.data
        if(book){
            return(<div className="mycollection">
                <h3 >Book Name: {book.name}</h3>
                <p>Genre: {book.genre}</p>
                <p>Author: {book.author.name}</p>

                <p>Other books by {book.author.name} :</p>
                <ul className="otherbooks">
                  {book.author.books.map(item=>{
                      return<li key={item.id}>{item.name}</li>
                  })}
                </ul>
            </div>)
        }
        else{
            return(<h2 className="mycollection"> Select a book to see details</h2>)
        }
    }
  render(){
    return (
       <div id="bookinfo">
       {this.displayBookInfo()}
       </div>
      )
  }
  }
  
  export default graphql(getBookQuery, {
      options:(props)=>{
          return{
              variables:{
                  id:props.bookId
              }
          }
      }
  })(BookInfo)
  