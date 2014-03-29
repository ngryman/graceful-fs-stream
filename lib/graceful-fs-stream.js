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
 * Exports.
 */

fs.ReadStream = ReadStream;
fs.WriteStream = WriteStream;
module.exports = fs;