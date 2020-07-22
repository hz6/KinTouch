import React from 'react'
import Skeleton from "@material-ui/lab/Skeleton";

function ErrorPage() {
  return (
    <div className="jumbotron" style={{ margin: 20 }}>
      <h1 style={{ marginBottom: 10 }}>404</h1>
      <hr />
      <div className="row">
        <Skeleton style={{ margin: 10 }} variant="circle" width={45} height={45} />
        <h4 style={{ marginTop: 20 }}>You are as lost as I am</h4>
      </div>
    </div >
  )
}
export default React.memo(ErrorPage);