const {processImage,toTensor} = require('./classifier.js')
const express = require('express')
const fs = require('fs')
const Canvas = require('canvas')
const tf = require('@tensorflow/tfjs')
const tfcon = require('@tensorflow/tfjs-converter')
require('@tensorflow/tfjs-node')

const port = 8080;
var model;

/*tfcon.loadFrozenModel('file://./model/tensorflowjs_model.pb','file://./model/weights_manifest.json').then(Fmodel => {
    model = Fmodel;
}).catch((err) => {
    console.log(err)
})*/

tf.loadModel('http://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json').then(data =>
{
    model = data;
}).catch(err => console.log(err))

const app = express()

app.get('/', (request, response) => {
    response.send('Hello from Express!')
})

app.get('/predict', (request, response) => {
    const can = new Canvas(244,244);
    const pixels = tf.fromPixels(can);
    const dimensions = tf.reshape(pixels,[-1,244,244,3])
    console.log(model.predict(dimensions));
})


//loadImage().then( data => {console.log(data)}).catch(err => console.log(err))


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})





