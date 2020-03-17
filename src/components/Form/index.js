import React, {Component} from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputComponent from '../Input/index';
import { ValidatorForm } from 'react-material-ui-form-validator';
import styles from '../../App.css';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

class FormComponent extends Component{

    formConfig=[];

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            ...props.formState,
            disabled: true
        };

        this.setForm();
        this.setSubmitFunction();
        this.dynamicRef();
        this.validatorListener = this.validatorListener.bind(this);
        this.onChange = this.onChange.bind(this);

        this.handleBlur = this.handleBlur.bind(this);
    }

    setForm(){
        if( this.props.formConfig && this.props.formConfig.length > 0 ){
            this.formConfig = this.props.formConfig;
        }
    }

    setSubmitFunction(){
        if (this.props.handleSubmitForm) {
            this.handleSubmit = this.props.handleSubmitForm.bind(this);
        }
    }

    dynamicRef(){
        if(this.formConfig.length > 0) {
            this.formConfig.map((field, index) => {
                this[`${field.name}Ref`] = React.createRef();
            });
        }
    }

    onChange = (event) => {
        const { data } = this.state;
        data[event.target.name] = event.target.value;
        this.setState({ data });
    }

    validatorListener () {
        this.form.isFormValid().then(
            result => {
                this.setState({ disabled: !result});
            }
        );
    }

    handleSubmit(e){
        e.preventDefault();
    }

    handleBlur(event) {
        this.triggerValidate(event);
    };

    triggerValidate(event){
        if(this[`${event.target.name}Ref`]){
            this[`${event.target.name}Ref`].current.validate(event.target.value, true);
        }
    }

    handleError = () => {
        this.setState({ disabled: !this.form.isFormValid() });
    };

    render() {
        const { data, disabled } = this.state;
        const { classes } = this.props;

        return (
            <ValidatorForm
                ref={node => (this.form = node)}
                instantValidate={true}
                className="form-data"
                onSubmit={this.handleSubmit}
                onError={this.handleError}
            >
                {
                    this.formConfig.map(
                        (field, index) =>{

                            return <InputComponent
                                key={index}
                                onBlur={this.handleBlur}
                                ref={this[`${field.name}Ref`]}
                                label={field.label}
                                onChange={this.onChange}
                                name={field.name}
                                type="text"
                                validatorListener={this.validatorListener}
                                validators={field.validations}
                                errorMessages={field.errorsMsn}
                                value={data[field.name] || ''}
                            />
                        }
                    )
                }
                <Button disabled={disabled} type="submit">Submit</Button>
            </ValidatorForm>
        );
    }
}

export default withStyles(useStyles)(FormComponent);
