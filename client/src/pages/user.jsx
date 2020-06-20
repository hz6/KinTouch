import React, { Component } from 'react';
import Card from "../assets/card"
import {connect} from "react-redux";
import {  CircularProgress } from '@material-ui/core';
import axios from "axios";

class UserPage extends Component {
  constructor(props){
    super(props);
    this.state={
      postData:[]
    };
  }

  componentDidMount = async () => {
    console.log("getting doc from: /api/post/user/get");
    const doc = await axios.get("/api/post/user/get");
    if (doc.data.err) { return null; } // No user detected
    console.log(doc.data);
    this.setState({postData:doc.data});
  }

  render() {
    const {postData} = this.state;
    
    return (
      <div className="col">
        <div className="row" style={{margin:10}}>
          
            <h1> My Posts </h1>
          
        </div>
        <div className="row" style={{margin:10}}>
          {
            postData.length !== 0 ?
            postData.map((post, index) => { 
              return <Card key={index} post={post} style={{margin:10}} showDelete={true} />
            }
            ) : (
              <div>
                <h4>No posts yet.</h4>
                <CircularProgress />
              </div>
            )
          }  
        </div>
        
 
      </div>
    )
  }
}

const mapStatesToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStatesToProps)(UserPage);