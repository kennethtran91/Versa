Versa.Views.AlbumShow = Backbone.View.extend({
	template: JST['albums/show'],

	initialize: function() {
		var that = this;
		var album_tracks = this.model.get('album_tracks');
		this.tracks = [];
		album_tracks.each(function(album_track) {
			that.tracks.push(album_track.get('track'))
		});
	},

	render: function() {
		var renderedContent = this.template({album: this.model, tracks: this.tracks})
		this.$el.html(renderedContent);
		return this;
	},


})