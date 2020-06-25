import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: "90%",
  },

});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{marginTop:10,width:"90%"}}>
      <CardContent>
        <div className="row">
          <Avatar style={{marginLeft:15}} src={props.comment.userPhoto} />
          <Typography  gutterBottom style={{marginLeft:15}} variant="h5" component="h4">
            { props.comment.userName }
          </Typography>
        </div>
        <hr/>
        <Typography style={{marginTop:5}} variant="body1" color="textPrimary" component="p">
          { props.comment.content }
        </Typography>
      </CardContent>
    </Card>
  );
}
