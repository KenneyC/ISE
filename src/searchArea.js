import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import ReactDOM from 'react-dom';

export default class SearchArea extends Component {

    constructor() {
        super();

        this.state = {
            width: 1500000
        }
    }


    render() {
        return (
            <TextField variant={"outlined"} label={"Make 'em Dance"} fullWidth='true'/>
        );
    }
}


