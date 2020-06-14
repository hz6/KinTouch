import React, { Component } from 'react';
import { Button } from "@material-ui/core";
import axios from "axios";
import Card from "../assets/card";

export default class MainPage extends Component {
  constructor(props){
    super(props);
    this.state={
      name:"Anthony Zhang",
      score:0,
      images:[],
      show:true
    };
  }

  componentDidMount(){}

  renderScore(){
    const {score} = this.state;
    switch (score) {
      case 0:
        return <h3>Your score is not available</h3>;
      case 100:
        return <h3>Your score is good: {score}</h3>;
      default:
        return <h3>Your score is bad </h3>;
    }
  }

  getDog = async ()=> {
    const dog = await axios.get("https://dog.ceo/api/breeds/image/random");
    console.log(dog.data);// 调用API得到的东西要用.data来获取具体内容
    const {images} = this.state;
    var newImage = images;
    newImage.push(dog.data.message);
    this.setState({images:newImage});
    // console.log(this.state.images);
  }

  renderPage = (images) => {
    return (
      <div className="col-8">
            <h2>Hello {this.state.name}</h2>
              <Button color="primary" variant="outlined" onClick={this.getDog}>
                Get a Dog
              </Button>
            <br/>
            {
              images.length === 0 ? (
                <h3>You don't have images yet</h3>
              ):(
                images.map((url,index) => {
                  /* return <img src={url} key={index} alt="" style={{width:200}}/> */
                  return <Card url={url} key={index} addOne={()=>this.setState({score:this.state.score+1})}/>
                })
              )
            }
          </div>
    );
  }

  showMainContent = () => {
    const {show} = this.state;
    this.setState({show:!show});
    console.log(show);
    
  }

  render() {
    const {images} = this.state;
    return (
      <div>
      <Button color="default" variant="contained" onClick={this.showMainContent}>
        Show/Close
      </Button>
        <div className="row">
          { this.state.show ? null:this.renderPage(images)}
          {/* <div className="col-4">
            {this.renderScore()}
            <h1>{this.state.score}</h1>
            
            <Button color="primary" variant="outlined" onClick={()=>this.setState({score: this.state.score + 1})}>
              Increase
            </Button>
            
            <Button color="inherit" variant="contained" onClick={()=>this.setState({score: this.state.score - 1})}>
              Decrease
            </Button>

            <TextField onChange={(event)=>this.setState({score:Number(event.target.value)})}/>
          </div> */}
        </div>
      </div>
    )
  }
}

