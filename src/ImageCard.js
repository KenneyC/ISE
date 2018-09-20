import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactFlipCard from 'react-card-flip';
import Card from '@material-ui/core/Card'

export default class ImageCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFlipped: false
        };
        this.image1=null;
        this.image2=null;
        this.button = React.createRef()
    }

    changeImage = () => {
        if(this.state.isFlipped == false) {
            this.setState({isFlipped: true});
        } else {
            this.setState({isFlipped: false});
        }
    }

    render() {
        return (
            <div>
                <ReactFlipCard
                    isFlipped={this.state.isFlipped}>
                    <div key="front">
                        <Card className={'ImageCard'}></Card>
                    </div>
                    <div key="back">
                        <Card className={'ImageCard'}></Card>
                    </div>
                </ReactFlipCard>
            </div>

        );
    }


}
