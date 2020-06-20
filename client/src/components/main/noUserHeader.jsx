import React, { Component } from "react";
import Skeleton from "@material-ui/lab/Skeleton";


class NoUserHeader extends Component {
  render() {
    return (
      <div className="jumbotron">  
        
          <h1 style={{marginBottom:10}}> Hello, Welcome to KinTouch </h1>
          <div className="row">
            <Skeleton style={{margin:10}} variant="circle" width={45} height={45} />
            <p style={{marginTop:20}} > Please login with your Google Account (Click the login button in the Navigation Bar) </p>
          </div>
          
        
      </div>
    )
  }
}

export default NoUserHeader;
