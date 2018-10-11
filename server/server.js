import express from 'express';
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs');
const jpg = require('jpeg-js');
const sharp = require('sharp');
const req = require('request')


let app = express();

const search = (tag) => {
    

}

const loadModel = async() => {
    const mn = new mobilenet.MobileNet(1, 1);
    mn.path = `file://ModelMNv1/model.json`;
    await mn.load();
    return mn;
}

const loadImage = (imageURL) => {
    let image = fs.readFileSync('bigdoge.jpg');
    let pixels = jpg.decode(image,true);
    return pixels;
}

const preProcessImage = (image) => {
    let pixels = image.data;
    let numPixels = image.width * image.height;
    let values = new Int32Array(numPixels * 3);

    for(let i=0; i< numPixels;i++){
        for(let channel =0; channel<3;channel++){
            values[i * 3 + channel] = pixels[i * 4 + channel];
        }
    }
    let shape = [image.width, image.height, 3];
    let input = tf.tensor3d(values,shape,"int32");

    return input;
}

const classify = async (imageURL) => {
    let model = await loadModel();
    let image = loadImage();
    let input = preProcessImage(image);
    let prediction = await model.classify(input);
    return prediction;
}

classify().then(data => console.log(data));

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('Hello World')
})


app.listen(3000, () => console.log('Example app listening on port 3000!'));
