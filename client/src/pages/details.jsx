import React, { Component } from 'react'

class DetailPage extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount = async () => {

  }

  render() {
    return (

      <div className="jumbotron">
        <Card>
          <CardContent>
            <div className="row">
              
              <div className="col-3">
                <Avatar 
                  src={""} 
                  style={{height:100, width:100, margin:5}} 
                />
              </div>
              
              <div className="col-9">
                <Typography style={{margin:5}}>
                  Name: {"Anthony Zhang"}
                </Typography>
              </div>
            
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default DetailPage