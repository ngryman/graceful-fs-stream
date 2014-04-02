/*!
 * graceful-fs-stream
 * Copyright (c) 2014 Nicolas Gryman <ngryman@gmail.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var fs = require('fs'),
	ReadStream = require('./read').ReadStream,
	WriteStream = require('./write').WriteStream;

/**
 * Replace standard exports
 */

fs._ReadStream = fs.ReadStream;
fs.ReadStream = ReadStream;

fs._createReadStream = fs.createReadStream;
fs.createReadStream = function(path, options) {
	return new ReadStream(path, options);
};

fs._WriteStream = fs.WriteStream;
fs.WriteStream = WriteStream;

fs._createWriteStream = fs.createWriteStream;
fs.createWriteStream = function(path, options) {
	return new WriteStream(path, options);
};

/**
 * Exports.
 */

module.exports = fs;