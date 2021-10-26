import React, { Component } from 'react';
import NoUserHeader from "../components/main/noUserHeader";
import UserHeader from "../components/main/userHeader";
import { connect } from "react-redux";
import { CircularProgress, Container } from '@material-ui/core';
import Card from "../assets/card";
import * as actions from "../actions";
import { selectCurrentUser } from "../selectors/user";
import { selectAllPosts } from "../selectors/post";
import { createStructuredSelector } from "reselect";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      loading: false
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    await this.props.GetAllPosts();
    this.setState({ allPosts: this.props.allPosts, loading: false });
  }

  renderHeader = () => {
    const { currentUser } = this.props;
    switch (currentUser) {
      case null:
        return null;
      case false:
        return <NoUserHeader />
      default:
        return <UserHeader currentUser={currentUser} />
    }
  }

  render() {
    const { allPosts, loading } = this.state;
    return (
      <div>
        <div className="col-12" style={{ marginTop: 10 }}>
          {this.renderHeader()}
        </div>
        <div>
          <Container>
            {
              loading ? <CircularProgress />
                :
                allPosts.length !== 0 ?
                  (
                    <div className="row" >
                      {
                        allPosts.reverse().map((post, index) =>
                          <Card key={index} post={post} showDelete={false} />
                        )
                      }
                    </div>
                  ) : <h4>No posts yet.</h4>
            }
          </Container>
        </div>
      </div>
    )
  }
}

const mapStatesToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  allPosts: selectAllPosts,
})

export default connect(mapStatesToProps, actions)(MainPage);