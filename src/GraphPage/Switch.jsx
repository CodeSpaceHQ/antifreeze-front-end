import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import TempSelect from './TempSelect.jsx';

class SwitchLabels extends React.Component {
    constructor(props) {
        super(props); 
        
        this.state = {
            checked: false,
          };
        
        this.handleChange = name => event => {
            this.setState({ [name]: event.target.checked });
          };
    }


  render() {

    return (
        <div>
        <FormControlLabel style={{float: 'left',  marginLeft: '12px', marginBottom: '0px'}}
          control={
            <Switch  
              checked={this.state.checkedF}
              onChange={this.handleChange('checked')}
              value="checked"
            /> 
          }
          label="Enable Push Notifications"
        />
        { this.state.checked ? <TempSelect/> : null }
        
        </div>
    );
  }
}

export default SwitchLabels;