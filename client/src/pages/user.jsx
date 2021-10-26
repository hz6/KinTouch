import React, { Component } from 'react';
import { connect } from "react-redux";
import { Avatar, CircularProgress } from '@material-ui/core';
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
      postData: [],
      loading: false
    };
  }

  componentDidMount = async () => {
    if (this.props.currentUser) {
      await this.getUserPosts();
    }
  }

  getUserPosts = async () => {
    this.setState({ loading: true })
    await this.props.GetUserPosts();
    this.setState({ postData: this.props.userPosts, loading: false });
  }

  handleDelete = async (postId, imageKey) => {
    console.log("imageKey:", imageKey);
    await this.props.DeleteUserPost(postId, imageKey);
    await this.getUserPosts();
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
    const { postData, loading } = this.state;
    return (
      <div className="col">
        <div className="row jumbotron" style={{ margin: 15, background: '#FFB6C1' }}>
          {this.renderAvatar()}
          <h1 style={{ margin: 30 }}> My Posts </h1>
        </div>
        <hr />
        <div className="row" style={{ margin: 10 }}>
          {
            loading ?
              <CircularProgress />
              :
              postData.length !== 0 ?
                postData.reverse().map((post, index) => <Card key={index} post={post} style={{ margin: 10 }} showDelete={true} handleDelete={() => this.handleDelete(post._id, post.image)} />)
                :
                <h4>No posts found.</h4>
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