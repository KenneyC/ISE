import express from 'express';
import {findTopTen} from "./backend";
require('@tensorflow/tfjs-node');
const req = require('request').defaults({encoding: null});

let app = express();

/*findTopTen('coral reef').then(data => {
    console.log(data);
});*/

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/tags/:tags', function (req, res) {
    let tags = req.params.tags.split(';');
    for (let i =0; i<tags.length; i++) {
        findTopTen(tags[i]).then(data => {
            res.send(data);
        })
    }
})


app.listen(3000, () => {
    console.log('Example app listening on port 3001!')
});
