import React, { Component } from 'react';
import { Button, TextField } from "@material-ui/core";
import axios from "axios";

export default class MainPage extends Component {
  constructor(props){
    super(props);
    this.state={
      name:"Anthony Zhang",
      score:0
    };
  }

  componentDidMount(){}

  getDog = async ()=> {
    
  }

  render() {
    
    return (
      <div>
        <div className="row">
          <div className="col-4">
            <h2>Hello {this.state.name}</h2>
          </div>
          <div className="col-8">
            <h3>Your score is {this.state.score}</h3>
            <Button 
              color="primary" 
              variant="outlined" 
              onClick={()=>this.setState({score: this.state.score + 1})}>
              Increase
            </Button>
            <Button 
              color="inherit" 
              variant="contained" 
              onClick={()=>this.setState({score: this.state.score - 1})}>
              Decrease
            </Button>
            <TextField 
              onChange={(event)=>this.setState({score:Number(event.target.value)})}/>
          </div>
          
        </div>
      </div>
    )
  }
}

