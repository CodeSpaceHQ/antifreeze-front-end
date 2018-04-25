import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { SwitchLabels } from './Switch.jsx';
const styles = {
  card: {
    minWidth: 275,
    maxWidth: '95%',
    marginBottom: 92,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 5,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: '35.00%', // 16:9
  },
};

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
      <CardMedia
          className={classes.media}
          image="/assets/notifications.jpg"
        />
        <CardActions >
        <SwitchLabels device_id={props.device_id}/>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);