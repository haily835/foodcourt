import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';
import axios from 'axios'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
    padding: 0,
    width: 250,
    margin: "0 auto"
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

export default function Item(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            F
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <AddShoppingCartIcon onClick={() => props.handleSelect(props.info)}/>
          </IconButton>
        }
        title={props.info.name}
        subheader={props.info.price + "VND"}
      />
      <CardMedia
        component="img"
        className={classes.media}
        image={props.info.imgSrc}
        title={props.info.name}
      />
      {/* <CardContent>
        <Box component="fieldset" mb={3} borderColor="transparent">
        </Box>
      </CardContent> */}
      <CardActions disableSpacing>
        <Rating
          name={props.info.name}
          defaultValue={2}
          precision={1}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
          onChange={(e) => {
            let rating = ""

            if (e.target.value === 1) {
              rating = "oneStar"
            } else if (e.target.value === 2) {
              rating = "twoStar"
            } else if (e.target.value === 3) {
              rating = "threeStar"
            } else if (e.target.value === 4) {
              rating = "fourStar"
            } else {
              rating = "fiveStar"
            }
            alert("you rate this item" + rating)
            axios.post('http://localhost:5000/items/rating/' + props.info._id, { "rating": rating })
              .then(res => console.log(res))
          }}
        />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {props.info.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}