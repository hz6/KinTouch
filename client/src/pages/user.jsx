import React, { Component } from 'react';
import { connect } from "react-redux";
import { CircularProgress, Avatar } from '@material-ui/core';
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
    await this.props.GetUserPosts();
    this.setState({ postData: this.props.userPosts });
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
      return <CircularProgress />;
    }
  }

  render() {
    const { postData } = this.state;

    return (
      <div className="col">
        <div className="row jumbotron" style={{ margin: 15 }}>
          {this.renderAvatar()}
          <h1 style={{ margin: 40 }}> My Posts </h1>
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
                  <h4>No posts yet.</h4>

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