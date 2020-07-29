import React, { Component } from 'react'
import { connect } from "react-redux";
import * as actions from "../../actions";
import { selectCurrentUser } from "../../selectors/user";
import { createStructuredSelector } from "reselect";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    await this.props.SetCurrentUser();
  }

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
              <a className="nav-link" style={{ marginLeft: 10, marginRight: 10 }} href="/user">
                My Posts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{ marginLeft: 10, marginRight: 10 }} href="/auth/logout"
                onClick={
                  () => {
                    this.props.UserLogOut();
                    window.location = "/"
                  }}>
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
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav">

            {this.renderHeader()}

          </ul>
        </div>
      </nav>

    )
  }
}

const mapStatesToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

export default connect(mapStatesToProps, actions)(Header);