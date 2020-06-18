import React, { Component } from 'react';
import Card from "../assets/card"
import keys from "../assets/keys"
import { Container, CircularProgress } from '@material-ui/core';
import axios from "axios";

export default class UserPage extends Component {
  constructor(props){
    super(props);
    this.state={
      postData:[]
    };
  }

  componentDidMount = async () => {
    console.log("getting doc");
    const doc = await axios.get("/api/post/all/get");
    console.log("getting doc success");
    console.log(doc.data);
    this.setState({postData:doc.data});
  }

  render() {
    const {postData} = this.state;
    
    
    return (
      <div className="col-6">
        
        <Container style={{marginTop:20}}>
          <h1> My Posts </h1>
        </Container>
        
          <Container style={{marginTop:25}}>
            {
              postData.length !== 0 ?
              postData.map((post, index) => 
                <Card 
                  key={index} 
                  url={keys.AWS + post.image} 
                  title={post.title}
                  content={post.content}
                  avatar={post.userPhoto}
                  time={post.createAt}
                />)
                : <CircularProgress />
            }
          </Container>
          
      </div>
    )
  }
}

