Versa.Views.ArtistShow = Backbone.View.extend({
	template: JST['artists/show'],

	render: function() {
		var renderedContent = this.template({artist: this.model});
		this.$el.html(renderedContent);
		return this;
	},
});