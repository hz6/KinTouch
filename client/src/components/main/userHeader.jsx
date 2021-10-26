import React from "react";
import { Avatar, Card, CardContent, Typography } from "@material-ui/core";
import PostForm from "../post/postForm";

const UserHeader = (props) => {


  return (
    <div style={{ background: '#FFC0CB' }} className="jumbotron">
      <Card style={{ background: "#DC143C" }}>
        <CardContent>
          <div className="row">

            <div className="col-3">
              <Avatar
                src={props.currentUser.image}
                style={{ height: 100, width: 100, margin: 5 }}
              />
            </div>

            <div className="col-9">
              <Typography style={{ margin: 5, color: "#FFC0CB" }}>
                Name: {props.currentUser.username}
              </Typography>
              <Typography style={{ margin: 5, color: "#FFC0CB" }}>
                Email: {props.currentUser.email}
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

export default React.memo(UserHeader);