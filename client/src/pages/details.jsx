import React, { Component } from 'react'
import { Card, CardContent, Avatar, Typography, CircularProgress, Container } from "@material-ui/core";
import Keys from "../assets/keys";
import CommentForm from "../components/comment/commentForm";
import { connect } from "react-redux";
import CommentCard from "../components/comment/commentCard";
import * as actions from "../actions";
import { selectCurrentUser } from "../selectors/user";
import { selectCurrentPost } from "../selectors/post";
import { selectCurrentComments } from "../selectors/comment";
import { createStructuredSelector } from "reselect";

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      postLoading: false,
      comments: [],
      commentsLoading: false
    };
  }

  componentDidMount = async () => {
    console.log(this.props.match.path);
    await this.getCurrentPost();
    await this.getComment();
  }

  handleDeleteComment = async (commentId) => {
    await this.props.DeleteComment(commentId);
    await this.getComment();
  }

  getCurrentPost = async () => {
    this.setState({ postLoading: true });
    await this.props.SetCurrentPost(this.props.match.params.id);
    this.setState({
      post: this.props.currentPost,
      postLoading: false
    });
  }

  getComment = async () => {
    this.setState({ commentsLoading: true });
    await this.props.GetCurrentComments(this.props.match.params.id)
    this.setState({
      comments: this.props.currentComments,
      commentsLoading: false
    });
  }

  renderCommentForm = () => {
    const { currentUser } = this.props;
    const { post } = this.state;
    switch (currentUser) {
      case null:
        return null;
      case false:
        return <h3> You need to login to comment this post</h3>;
      default:
        switch (post) {
          case null:
            return null;
          default:
            return <CommentForm getComment={() => this.getComment()} postId={post._id} />;
        }
    }
  }

  render() {
    const { post, comments, postLoading, commentsLoading } = this.state;
    const { currentUser } = this.props;
    // if not logged in don't show comments
    return (
      <div>
        <div className="jumbotron" style={{ margin: 10 }}>
          <Card>
            <CardContent>
              <div className="row">
                <div className="col-3">
                  {
                    post ?
                      <Avatar src={post.userPhoto} style={{ height: 85, width: 85, margin: 5 }} />
                      :
                      <CircularProgress />
                  }
                </div>
                <div className="col-9">
                  <Typography style={{ margin: 10 }}>
                    {
                      postLoading ?
                        <CircularProgress />
                        :
                        post ?
                          (<h3>{post.userName}'s post</h3>)
                          :
                          (<h3>Oops! post not found</h3>)
                    }
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {
          postLoading ?
            <CircularProgress />
            :
            post ?
              (<Card style={{ margin: 10 }}>
                <Container>
                  <img alt="" src={Keys.AWS + post.image} style={{ width: "90%", marginTop: 20 }} />
                </Container>
                <CardContent style={{ margin: 10 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    {post.content}
                  </Typography>
                </CardContent>
              </Card>)
              :
              (<CircularProgress />)
        }
        <Container style={{ marginTop: 10 }}>{this.renderCommentForm()}</Container>
        <Container >
          {
            commentsLoading ?
              <CircularProgress />
              :
              currentUser && comments.length !== 0 ?
                comments.map((comment, index) => <CommentCard key={index} handleDeleteComment={(commentId) => this.handleDeleteComment(commentId)} currentUser={currentUser} comment={comment} />)
                :
                null
          }
        </Container>
      </div>
    )
  }
}
const mapStatesToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentPost: selectCurrentPost,
  currentComments: selectCurrentComments,
})

export default connect(mapStatesToProps, actions)(DetailPage);
