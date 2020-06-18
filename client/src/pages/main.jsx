import React, { Component } from 'react';
import PostForm from '../components/post/postForm'
import { Container } from '@material-ui/core';

export default class MainPage extends Component {
  constructor(props){
    super(props);
    this.state={ };
  }

  render() {
    return (
      <div className="col-12">
        <Container style={{marginTop:20}}>
          <h1 > Main Page </h1>
        </Container>
        <Container style={{marginTop:25}}>
          <PostForm />
        </Container>
      </div>
    )
  }
}

