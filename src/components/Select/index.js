import React from 'react';
import TextField from '@material-ui/core/TextField';
import { ValidatorComponent } from 'react-material-ui-form-validator';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';


export default class SelectValidator extends ValidatorComponent {

    constructor(props) {
        super(props);
    }

    render() {
        /* eslint-disable no-unused-vars */
        const {
            error,
            errorMessages,
            validators,
            requiredError,
            helperText,
            validatorListener,
            withRequiredValidator,
            ...rest
        } = this.props;
        const { isValid } = this.state;
        return (
            <TextField
                {...rest}
                select
                className="Field"
                error={!isValid || error}
                helperText={(!isValid && this.getErrorMessage()) || helperText}
            >
                <MenuItem value="">
                    <em>Seleccionar</em>
                </MenuItem>
                {
                    this.props.values.map( (option, index) => {
                        return  <MenuItem key={index} value={option.value}>{option.value}</MenuItem>;
                    })
                }
            </TextField>
        );
    }
}
