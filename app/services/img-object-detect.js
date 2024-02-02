import Ember from 'ember';
const objectdetect = objectdetect || {};

export default Ember.Service.extend({

    canvas: null,

    setCanvas(canvas) {

        this.set('canvas', canvas);
        let context = canvas.getContext('2d');
        this.set('context', context);
    },

    setSize(size) {

        this.set('size', size);
    },

    setCallback(callback) {

        this.set('callback', callback);
    },

    readFile(file) {

        let reader = new FileReader();

        reader.onload = function (e) {
            this.processImage(e.target.result);
        }.bind(this);

        reader.readAsDataURL(file);
    },

    processImage(src) {

        let canvas = this.get('canvas');
        let context = this.get('context');
        let size = this.get('size');
        let classifier = objectdetect.frontalface;
        let callback = this.get('callback');
        let image = new Image();

        image.onload = function () {
            canvas.width = ~~(size * image.width / image.height);
            canvas.height = ~~(size);
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            let detector = new objectdetect.detector(canvas.width, canvas.height, 1.2, classifier);
            let rects = detector.detect(canvas);
            callback(rects);
        }.bind(this);

        image.src = src;
    },

    detect(file) {

        this.readFile(file);
    }

});
