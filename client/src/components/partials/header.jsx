import React, { Component } from 'react'
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => { }

  renderHeader = () => {
    const { currentUser } = this.props;
    switch (currentUser) {
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

        <div>
          <ul className="navbar-nav">
            {this.renderHeader()}
          </ul>
        </div>
      </nav>

    )
  }
}

const mapStatesToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStatesToProps)(Header);