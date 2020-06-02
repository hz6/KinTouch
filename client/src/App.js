import React, { Component } from "react"
import {Route, BrowserRouter} from "react-router-dom"
import MainPage from "./pages/main";
import Header from "./components/partials/header";

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      name:"hello",
    };
  }

  componentDidMount(){
    
  }

  render() {
    
    return (
      <BrowserRouter>
        <Header/>
        <Route exact path="/" component={MainPage} />
      </BrowserRouter>
    )
  }
}

