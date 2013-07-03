Versa.Views.SongsIndex = Backbone.View.extend({
	
	template: JST['songs/index'],

	render: function() {
		var renderedContent = this.template({songs: this.collection});
		this.$el.html(renderedContent);
		return this;
	},

})