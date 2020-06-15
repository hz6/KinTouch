import React, { Component } from 'react';
import PostForm from '../components/post/postForm'

export default class MainPage extends Component {
  constructor(props){
    super(props);
    this.state={
      name:"Anthony Zhang",
      score:0,
      images:[],
    };
  }

  componentDidMount = () => {}

  render() {
    return (
      <div className="col-12">
        <h1 > Main Page </h1>
        <PostForm />
      </div>
    )
  }
}

