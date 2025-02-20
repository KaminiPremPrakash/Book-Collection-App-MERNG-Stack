import React, { Component} from 'react';
//binds apollo to react
import { graphql} from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookInfo from './BookInfo'

class Booklist extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }
    displayBooks(){
        var data = this.props.data;
        if(data.loading){
            return (<div>Loading books...</div>)
        }
        else{
            return data.books.map(book=>{
                return(<li key={book.id} onClick={(e)=>{this.setState({selected: book.id})}}>{book.name}</li>)
            })
        }
    }
  render(){
      console.log(this.props)
    return (
        <div className="booklist-div" >
        <ul id="booklist">
            {this.displayBooks()}
        </ul>
        <BookInfo bookId={this.state.selected}/>
        </div>
      );
  }
  }
  
  export default graphql(getBooksQuery)(Booklist);
  