import React, { Component } from 'react';
import { connect } from "react-redux";
import { Avatar } from '@material-ui/core';
import Skeleton from "@material-ui/lab/Skeleton";
import Card from "../assets/card"
import * as actions from "../actions";
import { selectCurrentUser } from "../selectors/user";
import { selectUserPosts } from "../selectors/post";
import { createStructuredSelector } from "reselect";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: []
    };
  }

  componentDidMount = async () => {
    await this.getUserPost();
  }

  getUserPost = async () => {
    if (this.props.currentUser) {
      await this.props.GetUserPosts();
      this.setState({ postData: this.props.userPosts });
    } else {
      this.setState({ postData: []})
    }
  }

  handleDelete = async (postId, imageKey) => {
    console.log("imageKey:", imageKey);
    await this.props.DeleteUserPost(postId, imageKey);
    await this.getUserPost();
  }

  renderAvatar() {
    const { currentUser } = this.props;
    if (currentUser) {
      return <Avatar src={currentUser.image} style={{ margin: 10, height: 130, width: 130 }} />;
    } else {
      return <Skeleton style={{ margin: 30 }} variant="circle" width={55} height={55} />;
    }
  }

  render() {
    const { postData } = this.state;
    return (
      <div className="col">
        <div className="row jumbotron" style={{ margin: 15 }}>
          {this.renderAvatar()}
          <h1 style={{ margin: 30 }}> My Posts </h1>
        </div>
        <hr />
        <div className="row" style={{ margin: 10 }}>
          {
            postData !== undefined && postData.length !== 0 ?
              postData.reverse().map((post, index) => {
                return (
                  <Card
                    key={index}
                    post={post}
                    style={{ margin: 10 }}
                    showDelete={true}
                    handleDelete={() => this.handleDelete(post._id, post.image)} />
                );
              }
              ) : (
                <div>
                  <h4>No posts found.</h4>
                </div>
              )
          }
        </div>
      </div>
    )
  }
}

const mapStatesToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userPosts: selectUserPosts,
})

export default connect(mapStatesToProps, actions)(UserPage);