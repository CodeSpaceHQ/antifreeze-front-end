import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  root: {
    display: 'inherit',
    paddingLeft: '15px',
  },
  formControl: {
    minWidth: '320px',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class NativeSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      age: '',
      name: 'hai',
    };
  
    this.handleChange = name => event => {
      this.setState({ [name]: event.target.value });
    };
  }
 

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>       
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-helper">O °C</InputLabel>
          <Select
            native
            value={this.state.age}
            onChange={this.handleChange('age')}
            input={<Input id="age-native-helper" />}
          >
            <option value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
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