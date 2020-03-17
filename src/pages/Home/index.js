import React, {Component} from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputComponent from '../../components/Input';
import FormComponent from "../../components/Form";
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

class HomeComponent extends Component{

    formStructure = [
        {
            id: 'typeVehicle',
            name: 'typeVehicle',
            type: 'text',
            value: ['Carro','Moto', 'Bicicleta'],
            validations: ['required', 'matchRegexp:(?:^|\\W)moto(?:$|\\W)|(?:^|\\W)carro(?:$|\\W)|(?:^|\\W)bicicleta(?:$|\\W)'],
            errorsMsn: ['El tipo es requerido', 'El valor ingresado no es valido'],
            label: 'Tipo de vehiculo',
            classField: 'test1',
            classContainer: 'test1Container'
        },
        {
            id: 'picture',
            name: 'picture',
            type: 'text',
            value: null,
            validations: ['required'],
            errorsMsn: ['El la foto es requerida'],
            label: 'Foto del vehiculo',
            classField: 'test1',
            classContainer: 'test1Container'
        },
    ];


    constructor(props) {
        super(props);
        this.state = {
            data: {
                picture: '',
                typeVehicle: ''
            },
        }
    }

    handlerSubmitForm(e){
        e.preventDefault();
        if(this.state && !this.state.disabled) {
            console.log('consumo del api');
        }
    }

    render() {
        return (
            <FormComponent
                handleSubmitForm={this.handlerSubmitForm}
                formState={this.state}
                formConfig={this.formStructure}
            ></FormComponent>
        );
    }
}

export default withStyles(useStyles)(HomeComponent);
