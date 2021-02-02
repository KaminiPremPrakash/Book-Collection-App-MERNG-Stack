import React, { Component} from 'react';
//binds apollo to react
import { graphql} from 'react-apollo';
import flowright from 'lodash.flowright';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'

const compose = flowright;


class Addbook extends Component {
    constructor(props){
        super(props);
        this.state={
            name: '',
            genre:'',
            authorId: ''
        }
    }
    displayAuthors(){
        var data = this.props.getAuthorsQuery;
        if(data.loading){
            return(<option disabled>Loading Authors...</option>)
        }
        else{
            return data.authors.map(item=>{
                return(<option key={item.id} value={item.id}>{item.name}</option>)
            })
        }
    }
    

    onSubmitForm(e){
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            //refetch queries after there is change in data to update UI
            refetchQueries:[{query: getBooksQuery}]
        });
        alert('Book added successfully')
    }

   
  render(){
      console.log(this.props)
    return (
        <form id="add-book" onSubmit={this.onSubmitForm.bind(this)}>
        <div className="field">
            <label>Book name:</label>
            <input type="text"  onChange={(e)=>this.setState({name:e.target.value})}/>
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={(e)=>this.setState({genre:e.target.value})} />
        </div>
        <div className="field">
            <label>Author:</label>
            <select onChange={(e)=>this.setState({authorId:e.target.value})} >
                <option>Select author</option>
                { this.displayAuthors() }
            </select>
        </div>
        <button>Add Book </button>
    </form>
      );
  }
  }
  
  export default compose(
      graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
      graphql(addBookMutation, {name:"addBookMutation"})
      )(Addbook);
  