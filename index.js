var path = require('path');
var util = require('gulp-util');
var map = require('map-stream');
var QN = require('qn');
var assign = require('object-assign');
var slash = require('slash');

var log = util.log;
var colors = util.colors;
var PluginError = util.PluginError;

var PLUGIN_NAME = 'gulp-upload-qiniu';
var DEFAULTS = {
  flatten: false, // flatten path
  prefix: '',
  src: null,
};

exports.upload = function(options) {
  options = assign({}, DEFAULTS, options);

  var client = QN.create(options.qn);

  if (!options.qn) {
    throw new PluginError(PLUGIN_NAME, 'Missing Qiniu dn configs!');
  }


  // TODO: 根据文件 hash 判断文件是否改变，只上传改变的文件
  // http://kb.qiniu.com/53tubk96
  // https://github.com/demohi/gulp-qn/blob/master/lib/qn.js#L40

  // http://artandlogic.com/2014/05/a-simple-gulp-plugin/
  return map(function(file, callback) {
    if (file.isNull()) {
      callback(null, file);
      return;
    }

    var filename = options.flatten ? path.basename(file.path) : file.relative;
    var pathname = options.src ? file.path.substr(file.path.indexOf(options.src) + options.src.length) : filename;

    var fileKey = path.join(options.prefix, pathname);

    // var fileKey = path.join(options.prefix, options.flatten ?
    //   path.basename(file.path) : file.relative);

    // Both stream and buffer are supported
    client.upload(file.contents, {key: slash(fileKey)}, function(err, result) {
      if (err) {
        log('Error', colors.red(new PluginError(PLUGIN_NAME, err).message));
      } else {
        log('Uploaded:', colors.green(result.url));
      }
    });

    callback(null, file);
  });
};

/*exports.delete = function() {

};

exports.download = function() {

}*/
