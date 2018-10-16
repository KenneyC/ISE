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
let model;
let cache = {};

const addToCache = (results) => {
    for(let i =0; i<results.length;i++){
        if(results[i] != undefined) {
            let tags = results[i]['data'][0]['className'].split(", ");
            for(let predict=0; predict<3;predict++) {
                for (let j = 0; j < tags.length; j++) {
                    cache[tags[j]] = {url: results[predict]['url'], probability: results[predict]['data'][0]['probability']};
                }
            }
        }
    }
}

findTopTen().then(data => {
    let promises = [];
    for(let string of data) {
        promises.push(searchURL(string));
    }
    Promise.all(promises).then(data => {
        addToCache(data)
    }).catch((err) => {console.log(err)})
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
