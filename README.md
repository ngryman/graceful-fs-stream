# graceful-fs-stream

[![NPM](http://img.shields.io/npm/v/graceful-fs-stream.svg)](https://www.npmjs.org/package/graceful-fs-stream) [![Build Status](http://img.shields.io/travis/ngryman/graceful-fs-stream.svg)](https://travis-ci.org/ngryman/graceful-fs-stream) [![Dependency Status](http://img.shields.io/gemnasium/ngryman/graceful-fs-stream.png)](https://gemnasium.com/ngryman/graceful-fs-stream) [![Gittip](http://img.shields.io/gittip/ngryman.svg)](https://www.gittip.com/ngryman/)

<br>

> Graceful filesystem streams.

Provides both readable and writable filesystem streams that open the file on **first read or write**.

Because stream producers are not always stream consumers, it can be useful to create a stream without worrying if data
has ever been read or written.
It lazy opens or creates files. So it ensures a loose coupling between stream creation and file opening or creation.
This can be useful in various use case where you can to create streams without accessing the file system yet.

## Installation

```bash
npm install graceful-fs-stream --production
```

## Usage

```javascript
var fs = require('graceful-fs-stream');

/** read stream */

var readable = fs.createReadStream(file);
// file is no yet open
readable.once('data', function() {
	// file was just open
});

/** write stream */

var writable = fs.createWriteStream(path);
// file is not yet open
writable.write('hey');
// file was just open
```

Note that if you try to close a stream directly, it won't crash badly.

## Author

| [![twitter/ngryman](http://gravatar.com/avatar/2e1c2b5e153872e9fb021a6e4e376ead?size=70)](http://twitter.com/ngryman "Follow @ngryman on Twitter") |
|---|
| [Nicolas Gryman](http://ngryman.sh) |
