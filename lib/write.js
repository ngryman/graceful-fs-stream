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
	FileWriteStream = fs.WriteStream,
	util = require('util');

/**
 *
 * @constructor
 */
function WriteStream(path, options) {
	options = options || {};

	// here we make believe that we have an already opened file
	// by setting `options.fd` to a number (-1).
	// This ensure the file won't be created now.
	if ('number' != typeof options.fd)
		options.fd = -1;

	FileWriteStream.call(this, path, options);
}

util.inherits(WriteStream, FileWriteStream);

/**
 *
 * @param data
 * @param encoding
 * @param cb
 * @private
 */
WriteStream.prototype._write = function(data, encoding, cb) {
	// creates the file on first write
	if (0 === this.bytesWritten && -1 === this.fd) {
		this.fd = null;
		this.open();
	}

	FileWriteStream.prototype._write.call(this, data, encoding, cb);
};

/**
 *
 * @param cb
 */
WriteStream.prototype.close = function(cb) {
	if (-1 === this.fd) return;

	FileWriteStream.prototype.close.call(this, cb);
};

/**
 * Use our implementation instead.
 */
fs.createWriteStream = function(path, options) {
	return new WriteStream(path, options);
};

/**
 * Exports.
 */

module.exports.WriteStream = WriteStream;