import React, {Component} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormComponent from "../../components/Form";

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
            type: 'selectField',
            elementType: 'text',
            values: [ { value: 'carro', label:'Carro'}, { value:'moto', label:'Moto'}, { value: 'bicicleta', label: 'Bicicleta'}],
            validations: ['required', 'matchRegexp:(?:^|\\W)moto(?:$|\\W)|(?:^|\\W)carro(?:$|\\W)|(?:^|\\W)bicicleta(?:$|\\W)'],
            errorsMsn: ['El tipo es requerido', 'El valor ingresado no es valido'],
            label: 'Tipo de vehiculo',
            classField: 'test1',
            classContainer: 'test1Container'
        },
        {
            id: 'picture',
            name: 'picture',
            type: 'field',
            elementType: 'text',
            values: null,
            validations: ['required'],
            errorsMsn: ['El la foto es requerida'],
            label: 'Foto del vehiculo',
            classField: 'test1',
            classContainer: 'test1Container'
        },
        {
            id: 'buttonSubmit',
            name: 'buttonSubmit',
            type: 'button',
            elementType: 'submit',
            values: 'submit',
            validations: [],
            errorsMsn: [],
            label: 'Registrar',
            classField: null,
            classContainer: null
        }
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
