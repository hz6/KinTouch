import React, { Component } from 'react';
import { Button, Container, TextField, CircularProgress, Fab } from "@material-ui/core";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit"

export default class PostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      show:false,
      title:"",
      content:"",
      file:null,
      buttonDisabled:false,
      showProgress:false
    };
  }

  componentDidMount = () => {}

  showMainContent = () => {
    const {show} = this.state;
    this.setState({show:!show});
  }

  postButtonControl = () => {
    const {buttonDisabled,showProgress} = this.state;
    this.setState({
      buttonDisabled:!buttonDisabled,
      showProgress:!showProgress
    });
  }

  handlePost = async () => {
    this.postButtonControl();
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
      this.postButtonControl();
    }
    if(title && content){
      // save url to our db
      await axios.post("/api/post/create",{key,title,content});
      console.log("mongo db save");
      
      // refresh page
      window.location = "/user";
      this.postButtonControl();
    }
    this.postButtonControl();
  }

  render() {
    const { show, title,content } = this.state;
    return (
      <div>
        <Container>
          <Fab className={{height:60,width:60}} variant={show?"extended":"outlined"} color={show? "secondary":"primary"} onClick={this.showMainContent}>
            {show? 
            <div>
              <EditIcon/>
              Edit your post / Close
            </div>
            :
            <AddIcon/>}
          </Fab>
        </Container>
        {
          show ? 
          (<div className="jumbotron row">
            <div className="col-5">
              <h3> New Post </h3>
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
              <Button disabled={this.state.buttonDisabled} variant="contained" color="primary" onClick={this.handlePost}>
                Post
              </Button>
              {
                this.state.showProgress ?
                <CircularProgress/>
                :
                null
              }
            </Container>
            </div>
          </div>):null
        }
      </div>
    )
  }
}