(function(global) {
	'use strict';

	// constant
	var C = {
		prefix: 'zelda'
	};

	// cache
	var c = {
		root: {}
	};

	/**
	 *
	 */
	function resolvePath(path) {
		if (!_.isArray(path) && !_.isString(path)) {
			throw TypeError();
		}

		if (_.isArray(path)) {
			path = _.join(path, '.');
		}
		path = C.prefix + path;

		return path;
	}

	/**
	 *
	 */
	function namespace(path, object) {
		path = resolvePath(path);

		if (!_.isUndefined(object)) {
			_.set(c.root, path, object);
		}

		return _.get(c.root, path);
	}

	/**
	 *
	 */
	function using(path) {
		path = resolvePath(path);

		return _.get(c.root, path);
	}

	global.namespace = namespace;
	global.using = using;
})(window);
