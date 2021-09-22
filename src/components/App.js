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
    this.filterPosts = this.filterPosts.bind(this)
  }
  
  componentDidMount() {
      axios.get('https://practiceapi.devmountain.com/api/posts')
      .then(results=>{
        this.setState({posts: results.data})
      })
  }//How is this function working... they're not calling it

  updatePost(id,text) {
    console.log('hello?')
      axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`,{text}).then((res)=>{
        this.setState({
            posts: res.data
            
        })
        console.log(res.data)
      })
  }

  deletePost(id) {
    //Also this runs but console.logging doesn't work WHY?
      axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then((res=>{
        this.setState({
          posts: res.data
        })
      }))
  }

  createPost(text) {
      axios.post('https://practiceapi.devmountain.com/api/posts', {text}).then((res)=>{
          this.setState({posts: res.data})
      })

  }
  filterPosts(text){
    axios.get('https://practiceapi.devmountain.com/api/posts').then(res=>{
      let filterArr = res.data.filter(e=>e.text.includes(text)===true)
    
      this.setState({
          posts: filterArr
      })
    })
  }

  render() {
    const { posts } = this.state;
     

    return (
      <div className="App__parent">
        <Header filterFn={this.filterPosts}/>

        <section className="App__content">

          <Compose      createPostFn = {this.createPost}/>
          {
            posts.map((e)=>(
              <Post key={e.id}date={e.date} text={e.text}
                    updatePostFn={this.updatePost}
                    id = {e.id}
                    deletePostFn = {this.deletePost}
              
              />
            ))
            }
    
          
        </section>
      </div>
    );
  
}
}

export default App;
