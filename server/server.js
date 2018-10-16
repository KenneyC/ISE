import express from 'express';
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs');
const lineReader = require('readline-specific')
const jpg = require('jpeg-js');
const sharp = require('sharp');
const req = require('request').defaults({encoding: null});

const {readALine,findTopTen, searchURL} = require('./backend');

let app = express();

findTopTen('coral reef').then(data => {
    console.log(data);
});


app.get('/', function (req,res) {


})

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Hello World')
})


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});
