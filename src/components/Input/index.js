import React from 'react';
import red from '@material-ui/core/colors/red';
import TextField from '@material-ui/core/TextField';
import { ValidatorComponent } from 'react-material-ui-form-validator';

const red300 = red['500'];

const style = {
    right: 0,
    fontSize: '12px',
    color: red300,
    position: 'absolute',
    marginTop: '-25px',
};

class InputComponent extends ValidatorComponent {

     render() {
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
                error={!isValid || error}
                helperText={(!isValid && this.getErrorMessage()) || helperText}
            />
        );
    }
}

export default InputComponent;
