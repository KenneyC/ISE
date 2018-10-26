const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs');
const lineReader = require('readline-specific')

let model;

export const loadModel = async() => {
    const mn = new mobilenet.MobileNet(1, 1);
    mn.path = `file://ModelMNv1/model.json`;
    await mn.load();
    return mn;
}

export const preProcessImage = (image) => {
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


export const classify = async (imageURL) => {
    let prediction = await model.classify(imageURL);
    return prediction;
}

loadModel().then(data => {
    model = data;
})