import React, { Component } from 'react';
import { Button, Container, TextField } from "@material-ui/core";
import axios from "axios";
import CardPreview from "../../assets/cardPreview";

export default class PostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      show:false,
      title:"",
      content:"",
      file:null
    };
  }

  componentDidMount = () => {}

  showMainContent = () => {
    const {show} = this.state;
    this.setState({show:!show});
  }

  handlePost = async () => {
    const {file,title,content} = this.state;
    // request presigned-url(api) from backend server
    const uploadConfig = await axios.get("/api/image/upload");
    console.log(uploadConfig.data);
    
    const {url, key} = uploadConfig.data;
    // upload to AWS S3
    if (file) {
      await axios.put(url, file, {
        headers:{
          "Content-type":file.type,
        },
      });
      console.log("upload image");
    }
    // save url to our db
    await axios.post("/api/post/create",{key,title,content});
    console.log("mongo db save");
    
    // refresh page
    // or use <Link />
    window.location = "/user";
  }

  render() {
    const { show, title, content } = this.state;
    const postPreview = { title:title,content:content };
    return (
      <div>
        <Button variant={show ? "outlined":"contained"} color={show ? "secondary":"primary"} onClick={this.showMainContent}>
          {show ? "Cancel":"New Post"}
        </Button>
        {
          show ? 
          (<div className="jumbotron row">
            <div className="col-5">
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
                onChange={(event)=>this.setState({file : event.target.files[0]})}
              />
              <br/>
              <br/>
              <Button  variant="contained" color="primary" onClick={this.handlePost}>
                Post
              </Button>
            </Container>
            </div>
            <div className="col-7">
              <p>Preview of your post</p>
              <CardPreview
                post={postPreview}
              />
            </div>
            
          </div>):null
        }
      </div>
    )
  }
}