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
	FileReadStream = fs.ReadStream,
	util = require('util');

/**
 *
 * @constructor
 */
function ReadStream(path, options) {
	options = options || {};

	// here we make believe that we have an already open file
	// by setting `options.fd` to a number (-1).
	// This ensure the file won't be created now.
	if ('number' != typeof options.fd) {
		options.fd = -1;
	}

	FileReadStream.call(this, path, options);
}

util.inherits(ReadStream, FileReadStream);

/**
 *
 * @param n
 * @private
 */
ReadStream.prototype._read = function(n) {
	// creates the file on first read
	if (undefined === this.pos && -1 === this.fd) {
		this.fd = null;
		this.open();
	}

	FileReadStream.prototype._read.call(this, n);
};

/**
 *
 * @param cb
 */
ReadStream.prototype.close = function(cb) {
	if (-1 === this.fd) return;

	FileReadStream.prototype.close.call(this, cb);
};

/**
 * Use our implementation instead.
 */
fs.createReadStream = function(path, options) {
	return new ReadStream(path, options);
};

/**
 * Exports.
 */

module.exports.ReadStream = ReadStream;