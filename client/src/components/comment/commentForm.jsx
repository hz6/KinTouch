import React, { Component } from 'react';
import { Button, Container, TextField } from "@material-ui/core";
import Axios from 'axios';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      content: "",
    };
  }

  componentDidMount = () => { }

  showMainContent = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  handleComment = async () => {
    const { content } = this.state;
    const postId = this.props.postId;
    if (content) {
      await Axios.post("/api/comment/create", { content, postId });

      // window.location = "/post/" + this.props.postId;
      this.setState({ show: false });
      this.props.getComment();
    }
  }

  render() {
    const { show, content } = this.state;
    return (
      <div>
        <Button variant={show ? "outlined" : "contained"} color={show ? "secondary" : "primary"} onClick={this.showMainContent}>
          {show ? "Close Comment" : "Leave A Comment"}
        </Button>
        {
          show ?
            (<div className="jumbotron row">
              <div className="col-5">
                <h3> New Comment </h3>
                <hr />
                <Container>
                  <TextField id="standard-multiline-static" label="Content"
                    multiline
                    rows={3}
                    style={{ width: 300 }} value={content} onChange={(event) => this.setState({ content: event.target.value })}
                  />
                  <br />
                  <Button variant="contained" color="primary" onClick={this.handleComment} style={{ marginTop: 10 }}>
                    Post Comment
                </Button>
                </Container>
              </div>
            </div>) : null
        }
      </div>
    )
  }
}

export default React.memo(CommentForm);