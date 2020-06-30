import React, { Component } from 'react';
import Card from "../assets/card"
import {connect} from "react-redux";
import {  CircularProgress, Avatar } from '@material-ui/core';
import axios from "axios";

class UserPage extends Component {
  constructor(props){
    super(props);
    this.state={
      postData:[]
    };
  }

  componentDidMount = async () => {
    this.getUserPost();
  }

  getUserPost = async () => {
    console.log("getting doc from: /api/post/user/get");
    const doc = await axios.get("/api/post/user/get");
    if (doc.data.err) { return null; }
    console.log(doc.data);
    this.setState({postData:doc.data});
  }

  handleDelete = async (postId) => {
    await axios.post("/api/post/delete/" + postId);
    this.getUserPost();
  }

  renderAvatar(){
    const {currentUser} = this.props;
    if (currentUser) {
      console.log("current user:",currentUser);
      return <Avatar src={currentUser.image} style={{margin:10, height:130, width:130}} />;
    } else {
      return <CircularProgress />;
    }
  }

  render() {
    const {postData} = this.state;
    
    return (
      <div className="col">
        <div className="row jumbotron" style={{margin:15}}>
          {this.renderAvatar()}
          <h1 style={{margin:40}}> My Posts </h1>
        </div>
        <hr/>
        <div className="row" style={{margin:10}}>
          {
            postData.length !== 0 ?
            postData.map((post, index) => { 
              return (
                <Card 
                  key={index} 
                  post={post} 
                  style={{margin:10}} 
                  showDelete={true} 
                  handleDelete={() => this.handleDelete(post._id)} />
              );
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