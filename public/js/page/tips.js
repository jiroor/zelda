(function(global) {
	'use strict';

	var tips = {
		data: function() {
			var self = this;

			return {
				tips: []
			};
		},

		created: function() {
			var self = this;
			var promises = {
				tips: self.getTips()
			};

			Promise.props(promises);
		},

		methods: {
			getTips: function() {
				var self = this;
				var req = {
					url: '/zelda/tips',
					data: {}
				};

				return using('fetch').api(req)
					.then(function(data) {
						self.tips = data;
					});
			}
		},

		template: '#template--page--tips'
	};

	namespace('page.tips', tips);
})(window);
