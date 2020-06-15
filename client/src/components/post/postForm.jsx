import React, { Component } from 'react';
import { Button, Container, TextField } from "@material-ui/core";

export default class PostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      show:false,
      title:"",
      content:"",
      image:null
    };
  }

  componentDidMount = () => {}

  showMainContent = () => {
    const {show,title,content,image} = this.state;
    this.setState({show:!show});
  }

  render() {
    const {show} = this.state;
    return (
      <div>
        <Button color="default" variant="outlined" onClick={this.showMainContent}>
          Show/Close
        </Button>
        {
          show ? 
          (<div className="jumbotron">
            <h3>New Post</h3>
            <hr/>
            <Container>
              <TextField

              /><br/>
              <TextField/>

              <br/>
              <input/>

              <br/>
              <Button>

              </Button><br/>
            </Container>
          </div>):null
        }
      </div>
    )
  }
}