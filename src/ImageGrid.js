import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import ImageCard from './ImageCard'

export default class ImageGrid extends Component {

    constructor() {
        super();
        this.children = {};
        for(let i =0; i<12;i++) {
            this.children[i] = React.createRef();
        }
    }

    changeImage = (image) => {
        let child = Math.floor(Math.random() * (12));
        this.children[child].current.changeImage(image);
    }

    render() {
        return (

            <Grid container id={'row'} direction={'row'}>
                <Grid container id={'first-row'} md={12}  className={'GridCard'}>
                    <Grid item xs={2} justify={'center'}>
                        <ImageCard ref={this.children[0]}/>
                    </Grid>
                    <Grid item xs={2} className={'GridCard'} justify={'center'}>
                        <ImageCard ref={this.children[1]}/>
                    </Grid>
                    <Grid item xs={2} className={'GridCard'} justify={'center'}>
                        <ImageCard ref={this.children[2]}/>
                    </Grid>
                    <Grid item xs={2} className={'GridCard'} justify={'center'}>
                        <ImageCard ref={this.children[3]}/>
                    </Grid>
                    <Grid item xs={2} className={'GridCard'} justify={'center'}>
                        <ImageCard ref={this.children[4]}/>
                    </Grid>
                    <Grid item xs={2} className={'GridCard'} justify={'center'}>
                        <ImageCard ref={this.children[5]}/>
                    </Grid>
                </Grid>
                <Grid container id={'second-row'} md={12} justify={'center'} >
                    <Grid item xs={2} className={'GridCard'}>
                        <ImageCard ref={this.children[6]}/>
                    </Grid>
                    <Grid item xs={2} className={'GridCard'}>
                        <ImageCard ref={this.children[7]}/>
                    </Grid>
                    <Grid item xs={2} className={'GridCard'}>
                        <ImageCard ref={this.children[8]}/>
                    </Grid>
                    <Grid item xs={2} className={'GridCard'}>
                        <ImageCard ref={this.children[9]}/>
                    </Grid>
                    <Grid item xs={2} className={'GridCard'}>
                        <ImageCard ref={this.children[10]}/>
                    </Grid>
                    <Grid item xs={2} className={'GridCard'}>
                        <ImageCard ref={this.children[11]}/>
                    </Grid>
                </Grid>
            </Grid>
        );

    }


}