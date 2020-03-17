import React, {Component} from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputComponent from '../Input/index';
import { ValidatorForm } from 'react-material-ui-form-validator';
import SelectValidator from '../Select/index';

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
        console.log(this.state);
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

    createInput(index, field, data){
        return <InputComponent
                                key={index}
                                onBlur={this.handleBlur}
                                ref={this[`${field.name}Ref`]}
                                label={field.label}
                                onChange={this.onChange}
                                name={field.name}
                                value={field.values}
                                type={field.elementType}
                                validatorListener={this.validatorListener}
                                validators={field.validations}
                                errorMessages={field.errorsMsn}
                                value={data[field.name] || ''}
                            />
    }

    createSelect(index, field, data){
        return <SelectValidator
            key={index}
            onBlur={this.handleBlur}
            ref={this[`${field.name}Ref`]}
            label={field.label}
            onChange={this.onChange}
            name={field.name}
            values={field.values}
            value={this.state.data[field.name]}
            validatorListener={this.validatorListener}
            validators={field.validations}
            errorMessages={field.errorsMsn}
        />
    }

    createButton(index, field, disabled){
        return <Button key={index} disabled={disabled} type={field.elementType}>{field.label}</Button>
    }

    render() {
        const { data, disabled } = this.state;
        const { classes } = this.props;

        return (
            <ValidatorForm
                ref={node => (this.form = node)}
                instantValidate={true}
                onSubmit={this.handleSubmit}
                onError={this.handleError}
            >
                {
                    this.formConfig.map(
                        (field, index) =>{

                            switch(field.type) {
                                case 'field':
                                    return this.createInput(index, field, data);

                                case 'button':
                                    return this.createButton(index, field, disabled);

                                case 'selectField':
                                    return this.createSelect(index, field, data);

                            }

                        }
                    )
                }

            </ValidatorForm>
        );
    }
}

export default (FormComponent);
