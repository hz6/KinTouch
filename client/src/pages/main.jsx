import React, { Component } from 'react';
import NoUserHeader from "../components/main/noUserHeader";
import UserHeader from "../components/main/userHeader";
import {connect} from "react-redux";
import axios from 'axios';
import { CircularProgress, Container } from '@material-ui/core';
import Card from "../assets/card";

class MainPage extends Component {
  constructor(props){
    super(props);
    this.state={
      allPosts:[]
    };
  }

  componentDidMount = async() => {
    const doc = await axios.get("/api/post/all/get");
    this.setState({ allPosts:doc.data });
  }

  renderHeader = () => {
    const {currentUser} = this.props;
    switch (currentUser){
      case null:
        return null;
      case false:
        return <NoUserHeader/>
      default:
        return <UserHeader currentUser={currentUser} />
    }
  }

  render() {
    const {allPosts} = this.state;
    return (
      <div>
        <div className="col-12" >
          {this.renderHeader()}
        </div>
        <div>
          <Container>
            {
            allPosts.length !== 0 ?
            (
            <div className="row" >
              {
                allPosts.map((post,index) => {
                  return <Card post={post} />
                })
              }
            </div>
            ):(
              <div>
                <h4>No posts yet.</h4>
                <CircularProgress />
              </div>
            )
            }
          </Container>
          
        </div>
      </div>
      
    )
  }
}

const mapStatesToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStatesToProps)(MainPage);