Versa.Views.ArtistsIndex = Backbone.View.extend({
	template: JST['artists/index'],

	render: function() {
		var renderedContent = this.template({artists: this.collection});
		this.$el.html(renderedContent);
		return this;
	},
  
});