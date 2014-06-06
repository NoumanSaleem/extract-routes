var express = require('express'),
	should = require('should'),
	extractRoutes = require('../');

function noop(){}

describe('test', function () {
	it('should work on router', function(done) {
		var router = express.Router();
		router.get('/test', noop);

		extractRoutes(router)[0].should
			.be.an.Object
			.have.property('path', '/test');

		done();
	});

	it('should work on app', function(done) {
		var app = express();
		app.get('/test', noop);

		extractRoutes(app._router)[0].should
			.be.an.Object
			.have.property('path', '/test');

		done();
	});

	it('should work on mounting', function(done) {
		var router = express.Router(),
			app = express();

		router.get('/test', noop);
		app.use('/v1', router);

		extractRoutes(app._router)[0].should
			.be.an.Object
			.have.property('path', '/v1/test');

		done();
	});
});
