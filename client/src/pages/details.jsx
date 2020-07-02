import React, { Component } from 'react'
import axios from "axios";
import {Card, CardContent, Avatar, Typography, CircularProgress, Container} from "@material-ui/core";
import Keys from "../assets/keys";
import CommentForm from "../components/comment/commentForm";
import {connect} from "react-redux";
import CommentCard from "../components/comment/commentCard";

class DetailPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      post:null,
      comments:[]
    };
  }

  componentDidMount = async () => {
    this.getPost();
    this.getComment();
  }

  handleDeleteComment = async (commentId) => {
    await axios.delete("/api/comment/" + commentId);
    this.getComment();
  }

  getPost = async () => {
    const doc = await axios.get("/api/post/getone/" + this.props.match.params.id); 
    this.setState({
      post:doc.data,
    });
  }

  getComment = async () => {
    const doc = await axios.get("/api/comment/get/" + this.props.match.params.id);
    this.setState({
      comments:doc.data
    });
  }

  renderCommentForm = () => {
    const {currentUser} = this.props;
    const {post} = this.state;
    switch (currentUser){
      case null:
        return null;
      case false:
        return <h3> You need to login to comment this post</h3>;
      default:
        switch (post) {
          case null:
            return null;
          default:
            return <CommentForm getComment={()=>this.getComment()} postId={post._id} />;
      }
        
    }
  }

  render() {
    const { post, comments } = this.state;
    const {currentUser} = this.props;
    // if not logged in don't show comments
    return (
      <div>
        <div className="jumbotron" style={{margin:10}}>
          <Card>
            <CardContent>
              <div className="row">
                <div className="col-3">
                  {
                    post ? 
                    <Avatar src={post.userPhoto} style={{height:85, width:85, margin:5}}/>
                    :
                    <CircularProgress/>
                  }
                </div>
                <div className="col-9">
                  <Typography style={{margin:10}}>
                    {
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
          post ?
          (<Card style={{margin:10}}>
            <Container>
              <img alt="" src={Keys.AWS + post.image} style={{width:"90%",marginTop:20}} />
            </Container>
            <CardContent style={{margin:10}}>
              <Typography gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" color="textPrimary" component="p">
                {post.content}
              </Typography>
            </CardContent>
          </Card>)
          :
          (<CircularProgress/>)
        }
        <Container style={{marginTop:10}}>{this.renderCommentForm()}</Container>
        <Container >
          {
            currentUser && comments.length !== 0 ?
            comments.map(comment => <CommentCard handleDeleteComment={(commentId) => this.handleDeleteComment(commentId)} currentUser={currentUser} comment={comment} />)
            :
            null
          }
        </Container>
      </div>
    )
  }
}
const mapStatesToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStatesToProps)(DetailPage);
