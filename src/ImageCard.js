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

    changeImage = (url) => {
        if(this.image1 == null) {
            this.image1 = url;
            this.image2 = url;
            this.setState({isFlipped: true})
        } else {
            if (this.state.isFlipped == true) {
                this.image1 = url;
                this.setState({isFlipped: false});
            } else {
                this.image2 = url;
                this.setState({isFlipped: true});
            }
        }
    }

    render() {
        return (
            <div>
                <ReactFlipCard
                    isFlipped={this.state.isFlipped}>
                    <div key="front">
                        <Card className={'ImageCard'}>
                            <img src={this.image1}/>
                        </Card>
                    </div>
                    <div key="back">
                        <Card className={'ImageCard'}>
                            <img src={this.image2}/>
                        </Card>
                    </div>
                </ReactFlipCard>
            </div>

        );
    }


}
