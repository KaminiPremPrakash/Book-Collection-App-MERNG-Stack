import React, { Component} from 'react';
//binds apollo to react
import { graphql} from 'react-apollo';
import flowright from 'lodash.flowright';
import {addAuthorMutation, getAuthorsQuery} from '../queries/queries'

const compose = flowright;


class Addauthor extends Component {
    constructor(props){
        super(props);
        this.state={
            name: '',
            age:null,
        }
    }
    

    onSubmitForm(e){
        e.preventDefault();
        this.props.addAuthorMutation({
            variables: {
                name: this.state.name,
                age: this.state.age
            },
            //refetch queries after there is change in data to update UI
            refetchQueries:[{query: getAuthorsQuery}]
        });
        alert('Author added successfully')
    }

   
  render(){
    return (
        <form id="add-author-form" onSubmit={this.onSubmitForm.bind(this)}>
        <div className="field">
            <label>Author name:</label>
            <input type="text"  onChange={(e)=>this.setState({name:e.target.value})}/>
        </div>
        <div className="field">
            <label>Age:</label>
            <input type="number" onChange={(e)=>this.setState({age:parseInt(e.target.value)})} />
        </div>
        <button>Add Author </button>
    </form>
      );
  }
  }
  
  export default compose(
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
      graphql(addAuthorMutation, {name:"addAuthorMutation"})
      )(Addauthor);
  