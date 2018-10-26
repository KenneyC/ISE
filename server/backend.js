const lineReader = require('readline-specific')
const req = require('request').defaults({encoding: null});
const sharp = require('sharp');
const jpg = require('jpeg-js');
const TreeMap = require('treemap-js')

const {loadModel, preProcessImage, classify} = require('./classifier');

let cache = {};
let topRankingCache = {};


const addToCache = (result) => {
    if(result != undefined) {
        let results = result['data']
        for(let i = 0;i<results.length;i++) {
            let tags = results[i]['className'].split(", ");
            for (let j = 0; j < tags.length; j++) {
                updateTopRanking(tags[j],results[i]['probability'],result['url']);
            }
        }
    }
}

const updateTopRanking = (tag,prob,url) => {
    if(topRankingCache[tag] == undefined) {
        let newTag = new TreeMap();
        newTag.set(prob,url);
        topRankingCache[tag] = newTag;
    } else {
        topRankingCache[tag].set(prob,url);
        if(topRankingCache.length > 10){
            topRankingCache[tag].remove(topRankingCache[tag].getMinKey());
        }
    }
}


export const readALine = (i) => {
    return new Promise((resolve, reject)=> {
        lineReader.oneline('./fall11_urls.txt',i, (err,res) => {
            res = res.split('\t')[1]
            resolve(res)
        })
    })
}

export const findTopTen = async (tag) => {
    let lines = new Array();
    let matches = [];
    let tracker = 1;
    while(matches.length != 10) {
        let line = await readALine(tracker);
        await searchURL(line).then(data => {
            if(data != undefined) {
                if (findMatches(data, tag)) {
                    matches.push(data['url']);
                } else {
                    console.log('match found: ' + matches.length);
                }
                addToCache(data)
                console.log(cache['coral reef']);
            }
            tracker++;
        })
        /*if (line != undefined)
            lines.push(line)
        let promises = [];
        for (let string of lines) {
            promises.push(searchURL(string));
        }
        Promise.all(promises).then(data => {

        }).catch((err) => {
            console.log(err)
        })*/
    }
    topRankingCache['coral reef'].each((value,key) => {
        console.log(key + ", " + value)
    })
    return matches;
}

export const findMatches = (result,tag) => {
    let match = false;
    for (let count = 0; count < result['data'].length; count++) {
        let tags = result['data'][count]['className'].split(", ");
        console.log(tags);
        for (let i = 0; i < tags.length; i++) {
            if (tags[i] == tag) {
                match = true;
            }
        }
    }
    return match;
}


export const searchURL = (url) => {
    return new Promise((resolve,reject) => {
        req.get(url,{timeout: 3000} ,(err, data, body) => {
            if(err || data['statusCode'] == 404) {
                resolve();
            }
            if(body != undefined && data !=undefined && data['statusCode'] != 404) {
                let buffer = new Buffer(body);
                sharp(buffer).resize(224, 224).toBuffer().then(data => {
                    return jpg.decode(data, true)
                }).then((data) => {
                    let input = preProcessImage(data)
                    return input
                }).then(data => {
                    classify(data).then((data) => {

                        resolve({url: url, data})
                    })
                }).catch(err => {
                    console.log('faulty image')
                    resolve();
                });
            }
        })
    })
}