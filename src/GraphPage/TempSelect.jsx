import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  root: {
    display: 'inherit',
  },
  formControl: {
    minWidth: '160px',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class NativeSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: this.props.alarm
    };
  
    this.handleChange = name => event => {
      this.setState({ temp: event.target.value });
      this.props.temp_change(event.target.value);
    };
  }
 

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>       
        <FormControl className={classes.formControl}>
          <Select
            native
            value={this.state.age}
            onChange={this.handleChange('age')}
          >
            <option value="" > {this.props.alarm} °C </option>

            { Array.from(new Array(41),(val,index)=>index).map( digit => <option key = {digit} value={digit - 20}> {digit - 20} °C </option>) }
         
          </Select>
          <FormHelperText>Threshold Temperature for Notification</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

NativeSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NativeSelect);