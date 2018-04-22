import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Switch from './Switch.jsx';

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
};

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent style= {{paddingBottom: '0px'}}>
          <Typography className={classes.title} color="textSecondary">
            Temperature Alert
          </Typography>
        </CardContent>
        <CardActions  style= {{padding: '0px 4px', paddingBottom: '30px'}}>
        {<Switch/>}
        </CardActions>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);