import React, { Component } from 'react';
import Card from "../assets/card"
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
    console.log("getting doc from: /api/post/user/get");
    const doc = await axios.get("/api/post/user/get");
    console.log(doc.data);
    this.setState({postData:doc.data});
  }

  render() {
    const {postData} = this.state;
    
    return (
      <div className="col">
        <div className="row" style={{margin:10}}>
          <Container>
            <h1> My Posts </h1>
          </Container>
        </div>
        <div className="row" style={{margin:10}}>
          {
            postData.length !== 0 ?
            postData.map((post, index) => { 
              return <Card key={index} post={post} style={{margin:10}} />
            }
            ) : (
              <div>
                <h4>You don't have posts yet.</h4>
                <CircularProgress />
              </div>
            )
          }  
        </div>
        
 
      </div>
    )
  }
}

