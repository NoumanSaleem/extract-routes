var	join = require('path').join;

var getMountPath = /^\/\^([\\\/\-\w]+).+/;

function flattenRoute(route) {
	return Object.keys(route.methods).reduce(function (routes, method) {
		routes.push({
			method: method,
			path: route.path
		});

		return routes;
	}, []);
}

function extractRoutes(router, routes, mountPath) {
	if (!routes) routes = [];
	mountPath = mountPath ? mountPath.replace(/\\\//g, "/") : "";

	return router.stack.reduce(function (routes, layer) {
		if (layer.handle.stack) return extractRoutes(layer.handle, routes, getMountPath.exec(layer.regexp)[1]);
		if (layer.route) routes = routes.concat(flattenRoute(layer.route).map(function (route) {
        var path = route.path;
        if ('string' !== typeof route.path) path = path.toString();

				route.path = join(mountPath, path);
				return route;
			}));
		return routes;
	}, []);
}

module.exports = extractRoutes;
