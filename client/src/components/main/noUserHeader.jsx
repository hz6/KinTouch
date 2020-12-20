import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const NoUserHeader = () => {
  return (
    <div className="jumbotron">
      <h1 style={{ marginBottom: 10 }}> Hello, Welcome to KinTouch </h1>
      <hr />
      <div className="row">
        <Skeleton style={{ margin: 10 }} variant="circle" width={45} height={45} />
        <p style={{ marginTop: 20 }} > Please login with your Google Account </p>
      </div>
    </div>
  )

}

export default React.memo(NoUserHeader);
