Versa.Router = Backbone.Router.extend({
	initialize: function ($rootEl) {
		this.$rootEl = $rootEl;
	},

	routes: {
		"" : "listSongs",
		"songs/:id": "showSong"
	},

	listSongs: function() {
		var that = this;
		var songList = new Versa.Views.SongsIndex({
			collection: Versa.Store.songs,
		});
		$('#side_nav').html(songList.render().el);
	},

	showSong: function(id) {
		var that = this;
		Versa.Store.song = Versa.Store.songs.get(id);
		Versa.Store.song.fetch({
			wait: true,
			success: function() {
				var songShow = new Versa.Views.SongShow({ model: Versa.Store.song });
				that._swapView(songShow);
			}
		});
	},

	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		$('#content').html(view.render().$el);
	},


});