import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { CardActionArea, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Keys from "../assets/keys";
import Dialog from "../assets/dialog";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 5
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const RecipeReviewCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{ backgroundColor: '#FFC0CB' }} className={classes.root}>
      <CardActionArea onClick={() => window.location = `/post/${props.post._id}`}>
        <CardHeader
          avatar={<Avatar className={classes.avatar} src={props.post.userPhoto} />}
          title={props.post.title}
          subheader={moment(props.post.createAt).format('llll')}
        />
        <CardMedia
          className={classes.media}
          image={Keys.AWS + props.post.image}
          title="Post Image"
        />
      </CardActionArea>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon color="secondary" />
        </IconButton>
        {
          props.showDelete ?
            <Dialog handleDelete={props.handleDelete} title={"Delete Post"} />
            :
            null
        }
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{props.post.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
export default React.memo(RecipeReviewCard);