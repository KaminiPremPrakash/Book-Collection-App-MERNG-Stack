import React, { Component } from 'react'
import Booklist from './components/Booklist'
import Addbook from './components/Addbook'
import Addauthor from './components/Addauthor'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:3000/graphql'
})

class App extends Component {
render(){
  return (
 <ApolloProvider client={client}>
      <div id="main">
          <h1 className="mycollection">My Book Collection</h1>
        <Booklist/>
        <Addbook/>
        <Addauthor/>
      </div>
 </ApolloProvider>
  );
}
}

export default App;
