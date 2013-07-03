Versa.Router = Backbone.Router.extend({
	initialize: function ($rootEl) {
		this.$rootEl = $rootEl;
	},

	routes: {
		"" : "songIndex",
	},

	songIndex: function() {
		var that = this;
	},

});