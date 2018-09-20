import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';

export default class SearchArea extends Component {

    render() {
        return (
            <Grid container spacing={0} alignItems={'center'} justify="center" id={'searchArea'}>
                <Grid item xs={6}>
                    <TextField variant={"outlined"} label={"Make 'em Dance"} fullWidth={'true'}/>
                </Grid>
            </Grid>
        );

    }
}


