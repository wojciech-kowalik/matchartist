/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    lessOptions: {
      paths: [
        'app/styles/less'
      ]
    }
  });

  // css
  app.import('bower_components/bootstrap-select/dist/css/bootstrap-select.min.css');
  app.import("bower_components/blueimp-file-upload/css/jquery.fileupload.css");
  app.import('bower_components/hover/css/hover-min.css');
  app.import('bower_components/blueimp-gallery/css/blueimp-gallery.min.css');

  // js
  app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');
  app.import("bower_components/jquery-ui/ui/widget.js");

  app.import("bower_components/blueimp-tmpl/js/tmpl.min.js");
  app.import("bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.min.js");
  app.import("bower_components/blueimp-load-image/js/load-image.all.min.js");
  app.import("bower_components/blueimp-file-upload/js/jquery.iframe-transport.js");
  app.import("bower_components/blueimp-file-upload/js/jquery.fileupload.js");
  app.import("bower_components/blueimp-file-upload/js/jquery.fileupload-process.js");
  app.import("bower_components/blueimp-file-upload/js/jquery.fileupload-image.js");
  app.import("bower_components/blueimp-file-upload/js/jquery.fileupload-audio.js");
  app.import("bower_components/blueimp-file-upload/js/jquery.fileupload-video.js");
  app.import("bower_components/blueimp-file-upload/js/jquery.fileupload-validate.js");
  app.import("bower_components/blueimp-file-upload/js/jquery.fileupload-ui.js");
  app.import("bower_components/blueimp-gallery/js/jquery.blueimp-gallery.min.js");

  app.import('vendor/js-objectdetect/js/objectdetect.js');
  app.import('vendor/js-objectdetect/js/objectdetect.eye.js');
  app.import('vendor/js-objectdetect/js/objectdetect.frontalface.js');
  app.import('vendor/js-objectdetect/js/objectdetect.profileface.js');
  app.import('vendor/js-objectdetect/js/objectdetect.mouth.js');

  return app.toTree();
};
