import React, { Component } from "react";
import { Avatar, Card, CardContent, Typography } from "@material-ui/core";
import PostForm from "../post/postForm";

class UserHeader extends Component {

  render() {
    return (
      <div className="jumbotron">
        <Card>
          <CardContent>
            <div className="row">

              <div className="col-3">
                <Avatar
                  src={this.props.currentUser.image}
                  style={{ height: 100, width: 100, margin: 5 }}
                />
              </div>

              <div className="col-9">
                <Typography style={{ margin: 5 }}>
                  Name: {this.props.currentUser.username}
                </Typography>
                <Typography style={{ margin: 5 }}>
                  Email: {this.props.currentUser.email}
                </Typography>
              </div>

            </div>
          </CardContent>
        </Card>
        <div style={{ marginTop: 10 }}>
          <PostForm />
        </div>
      </div>
    )
  }
}

export default React.memo(UserHeader);