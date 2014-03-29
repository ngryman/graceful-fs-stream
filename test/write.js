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

describe('write stream', function() {

	it('should not open a file directly', function(done) {
		var file = path.join(fixturesPath, 'null');
		fs.createWriteStream(file);
		fs.exists(file, function(exists) {
			exists.should.be.false;
			done();
		});
	});

	it('should not fail on immediate close', function() {
		var file = path.join(fixturesPath, 'null');
		var out = fs.createWriteStream(file);
		out.close();
	});

	it('should still accept a fd', function(done) {
		var file = path.join(fixturesPath, 'write-fd.txt');
		fs.open(file, 'w', function(err, fd) {
			if (err) done(err);
			var out = fs.createWriteStream(file, { fd: fd });
			var spy = sinon.spy();
			out.on('open', spy);
			out.on('finish', function() {
				spy.should.not.have.been.called;
				var data = fs.readFileSync(file, 'utf8');
				data.should.equal('hi');
				fs.unlinkSync(file);
				done();
			});
			out.end('hi');
		});
	});

	it('should open a file on first write', function(done) {
		var file = path.join(fixturesPath, 'write-open.txt');
		var out = fs.createWriteStream(file);
		var spy = sinon.spy();
		out.write('hi');
		out.on('open', spy);
		out.on('open', function() {
			var exists = fs.existsSync(file);
			exists.should.be.true;
			var data = fs.readFileSync(file, 'utf8');
			data.should.equal('hi');
		});
		out.on('finish', function() {
			spy.should.have.been.calledOnce;
			fs.unlinkSync(file);
			done();
		});
		out.write(', i\'m a');
		out.end(' wombat.');
	});

});