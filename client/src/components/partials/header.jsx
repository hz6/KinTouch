import React, { Component } from 'react'
import {connect} from "react-redux";

class Header extends Component {
  constructor(props){
    super(props);
    this.state={};
  }

  componentDidMount = () => {}

  renderHeader = () => {
    const {currentUser} = this.props;
    switch (currentUser){
      case (null):
        return null;
      case false:
        return (
          <div className="row">
            <li className="nav-item active">
              <a className="nav-link" href="/auth/google">
                Login
              </a>
            </li>
          </div>
        );
      default:
        return (
          <div className="row">
            <li className="nav-item">
              <a className="nav-link" href="/user">
                My Posts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/auth/logout">
                Logout
              </a>
            </li>
          </div>
        );
    }
  }

  render() {
    
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">KinTouch</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">{this.renderHeader()}</ul>
        </div>
      </nav>
      
    )
  }
}

const mapStatesToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStatesToProps)(Header);