import React, { Component } from 'react';

import './App.css';
import axios from 'axios'
import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
      axios.get('https://practiceapi.devmountain.com/api/posts')
      .then(results=>{
        this.setState({posts: results.data})
      })
  }//How is this function working... they're not calling it

  updatePost() {

  }

  deletePost() {

  }

  createPost() {

  }

  render() {
    const { posts } = this.state;
     

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />
          {
            posts.map((e)=>(
              <Post key={e.id}date={e.date} text={e.text}/>
            ))
            }
    
          
        </section>
      </div>
    );
  
}
}

export default App;
