import React, { Component } from 'react';
import SearchArea from './searchArea';
import ImageGrid from './ImageGrid';
import Button from '@material-ui/core/Button';
let client = require('./authenticate')

class App extends Component {
    constructor(props) {
        super(props);
        this.grid = React.createRef();
        this.searchArea = React.createRef();
    }

    flip = (url) => {
        this.grid.changeImage(url);
    }

    search = async () => {
        let tags = this.searchArea.getTags();
        let url = tags.join(';');
        let results;
        await fetch('/tags/'+url).then(data=> {
            return data.json();
        }).then(data => {
            results = data;
            console.log(data);
        });

        for(let i=0;i<results.length; i++) {
            this.flip(results[i]);
        }
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