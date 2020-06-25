import React, { Component } from 'react';
import { Button, Container, TextField } from "@material-ui/core";

export default class CommentForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      show:false,
      content:"",
    };
  }

  componentDidMount = () => {}

  showMainContent = () => {
    const {show} = this.state;
    this.setState({show:!show});
  }

  handlePost = async () => {  
    window.location = "/post"+this.props.match.params.id;
  }

  render() {
    const { show, content } = this.state;
    return (
      <div>
        <Button variant={show ? "outlined":"contained"} color={show ? "secondary":"primary"} onClick={this.showMainContent}>
          {show ? "Close Comment":"Leave A Comment"}
        </Button>
        {
          show ? 
          (<div className="jumbotron row">
            <div className="col-5">
              <h3> New Comment </h3>
              <hr/>
              <Container>
                <br/>
                <TextField
                  id="standard-multiline-static"
                  label="Content"
                  multiline
                  rows={4}
                  style={{width:300}}
                  value={content}
                  onChange={(event)=>this.setState({content : event.target.value})}
                />
                <br/>
                <Button  variant="contained" color="primary" onClick={this.handlePost}>
                  Post Comment
                </Button>
              </Container>
            </div>
          </div>):null
        }
      </div>
    )
  }
}