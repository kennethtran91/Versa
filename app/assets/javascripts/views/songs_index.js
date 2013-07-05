Versa.Views.SongsIndex = Backbone.View.extend({

	initialize: function() {
		var that = this;
		var events = ["add", "remove"];
		_(events).each(function (event) {
			that.listenTo(that.collection, event, that.render);
		});
	},

	template: JST['songs/index'],

	render: function() {
		var renderedContent = this.template({songs: this.collection});
		this.$el.html(renderedContent);
		return this;
	},

});