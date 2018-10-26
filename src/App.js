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
        this.grid = React.createRef();
        this.searchArea = React.createRef();
    }

    flip = () => {
        this.grid.changeImage('./logo.svg');
    }

    search = async () => {
        let tags = this.searchArea.getTags();
        let url = tags.join(';');
        let results = await fetch('/tags/'+url);
        console.log(results);
    }

    render() {
        return (
            <section className="ise">
                <ImageGrid ref={ref => this.grid = ref}/>
                <SearchArea z-index={2} ref={ref => this.searchArea = ref}/>
                <Button onClick={this.search}>click me</Button>
            </section>
        );
    }
}
export default App;