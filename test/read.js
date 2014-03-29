/*!
 * graceful-fs-stream
 * Copyright (c) 2014 Nicolas Gryman <ngryman@gmail.com>
 * MIT Licensed
 */

/* jshint expr: true */
'use strict';

/**
 * Module dependencies.
 */
var fs = require('..'),
	path = require('path'),
	chai = require('chai'),
	sinon = require('sinon'),
	should = chai.should();

chai.use(require('sinon-chai'));

var fixturesPath = path.join(__dirname, 'fixtures');

describe('read stream', function() {

	it('should not open a file directly', function() {
		var file = path.join(fixturesPath, 'null');
		fs.createReadStream(file);
	});

	it('should not fail on immediate close', function() {
		var file = path.join(fixturesPath, 'null');
		var out = fs.createReadStream(file);
		out.close();
	});

	it('should still accept a fd', function(done) {
		var file = path.join(fixturesPath, 'read-fd.txt'), content;
		fs.open(file, 'r', function(err, fd) {
			if (err) done(err);
			var input = fs.createReadStream(file, { fd: fd, encoding: 'utf8' });
			var spy = sinon.spy();
			input.on('open', spy);
			input.on('end', function() {
				spy.should.not.have.been.called;
				content.should.equal('hi');
				done();
			});
			input.on('data', function(data) {
				content = data;
			});
		});
	});

	it('should open a file on first read', function(done) {
		var file = path.join(fixturesPath, 'read-open.txt'), content;
		var input = fs.createReadStream(file, { encoding: 'utf8' });
		var spy = sinon.spy();
		input.on('open', spy);
		input.on('end', function() {
			spy.should.have.been.calledOnce;
			content.should.equal('hi, i\'m a wombat.');
			done();
		});
		input.on('data', function(data) {
			content = data;
		});
	});

});