import React, { Component } from 'react'

export default class Header extends Component {
  constructor(props){
    super(props);
    this.state={
    };
  }

  componentDidMount=()=>{
    
  }

  render() {
    
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <a className="navbar-brand" href="/">
        KinTouch
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">Login <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">My Posts</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

