import React, { Component } from 'react';
import SearchArea from './searchArea';
import ImageGrid from './ImageGrid';
import Button from '@material-ui/core/Button';
let client = require('./authenticate')

client.ping({
    requestTimeout: 30000,
}, function (error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
    }

    flip = () => {
        this.child.changeImage('./logo.svg');
    }

    render() {
        return (
            <section className="ise">
                <ImageGrid ref={ref => this.child = ref}/>
                <SearchArea z-index={2}/>
                <Button onClick={this.flip}>click me</Button>
            </section>
        );
    }
}
export default App;