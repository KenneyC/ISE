import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import SearchArea from './searchArea'
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
    render() {
        return (
            <section className="ise">
                <div id={"searchArea"}>
                    <SearchArea />
                </div>
            </section>
        );
    }
}
export default App;