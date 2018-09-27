# gulp-upload-qiniu

Gulp plugin for upload static assets to qiniu cdn

## Install

```
npm install gulp-upload-qiniu --save-dev
```

## Usage

```js
var gulp = require('gulp');
var upload = require('gulp-qndn').upload;

var qnOptions = {
  accessKey: 'your access key',
  secretKey: 'your secret key',
  bucket: 'your bucket name',
  domain: 'https://xxx.xxx.com'
};

gulp.task('default', function() {
  return gulp.src('template.js')
    .pipe(upload({
      qn: qnOptions,
      prefix: 'build/',
      src: '/dist/public/',
    }))
    .pipe(gulp.dest('dist'));
});
```

## API

### `.upload(options)`

### `options.qn`

`object` Qinniu CDN config, see [qn docs](https://www.npmjs.com/package/qn#upload).

#### `options.prefix`

`string` file path prefix, default `''`.

#### `options.flatten`

`bool`, flatten file path or not, default `false`.

#### `options.src`

`string`, 待上传的文件目录(绝对目录) `null`.
