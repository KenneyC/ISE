import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip'
import Grow from '@material-ui/core/Grow'

export default class SearchArea extends Component {

    constructor(props) {
        super(props)
        this.state = {
            chipData: []
        }
        this.currentValue = React.createRef();
    }

    addLabel= (label) => {
        let newCount = this.state.chipData.length;
        let newChipData = this.state.chipData;
        newChipData[newCount] = {key: newCount, value: label}
        this.setState({
            chipData: newChipData
        })
    }

    handleDelete = (data) => {
        console.log(data)
        let chipData = this.state.chipData;
        let chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete,1);
        this.setState({
            chipData: chipData
        })

    }

    getTags = () => {
        let values = [];
        this.state.chipData.map(data => values.push(data.value));
        return values;
    }

    render() {
        return (
            <div>
                <Grid container spacing={0} alignItems={'center'} justify="center" id={'LabelBar'}>
                    <Grid item xs={6}>
                        {this.state.chipData.map(data => {
                            return (
                                <Grow in={true}>
                              <Chip
                                key={data.key}
                                label={data.value}
                                className={'Label'}
                                onDelete={testdata => this.handleDelete(data)}
                                />
                                </Grow>
                            );
                        })}
                    </Grid>
                </Grid>
                <Grid container spacing={0} alignItems={'center'} justify="center" id={'searchArea'}>
                    <Grid item xs={6}>
                        <TextField variant={'outlined'}
                                   label={'Make \'em Dance'}
                                   fullWidth={'true'}
                                   inputRef={ref => this.currentValue = ref}
                        onKeyPress={(key)=> {
                            if(key.key === 'Enter') {
                                this.addLabel(this.currentValue.value)
                            }
                        }}/>
                    </Grid>
                </Grid>
            </div>
        );

    }
}


