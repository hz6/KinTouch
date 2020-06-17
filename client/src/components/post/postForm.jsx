import React, { Component } from 'react';
import { Button, Container, TextField } from "@material-ui/core";
import axios from "axios";

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
    const {show} = this.state;
    this.setState({show:!show});
  }

  handlePost = async () => {
    const {image} = this.state;
    const uploadConfig = await axios.get("/api/image/upload");
    const {url, key} = uploadConfig.data;


  }

  render() {
    const {show,title,content} = this.state;
    return (
      <div>
        <Button variant={show?"outlined":"contained"} color={show?"secondary":"primary"} onClick={this.showMainContent}>
          {show? "Cancel":"New Post"}
        </Button>
        {
          show ? 
          (<div className="jumbotron">
            <h3>New Post</h3>
            <hr/>
            <Container>
              <TextField
                id="standard-basic"
                label="Title"
                style={{width:300}}
                value={title}
                onChange={(event)=> this.setState({title : event.target.value})}
              />
              <br/>
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
              <br/>
              <input
                type="file"
                accept="image/*"
                onChange={(event)=>this.setState({image : event.target.files[0]})}
              />
              <br/>
              <br/>
              <Button variant="contained" color="primary" onClick={this.handlePost}>
                Post
              </Button>
            </Container>
          </div>):null
        }
      </div>
    )
  }
}