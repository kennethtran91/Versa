Versa.Router = Backbone.Router.extend({
	initialize: function ($rootEl) {
		this.$rootEl = $rootEl;
		this.listSongs();
	},

	routes: {
		"" : "listSongs",
		"songs/new": "newSong",
		"songs/:id": "showSong",
		"artists/:id": "showArtist",
		"albums/:id": "showAlbum",
	},

	listSongs: function() {
		var that = this;
		var songList = new Versa.Views.SongsIndex({
			collection: Versa.Store.songs,
		});
		$('#side_index').html(songList.render().el);
	},

	newSong: function() {
		var that = this;
		var newSong = new Versa.Views.SongForm();
		that._swapView(newSong);
	},

	showSong: function(id) {
		var that = this;
		Versa.Store.song = Versa.Models.Song.findOrCreate({id: id});
		Versa.Store.song.fetch({
			wait: true,
			success: function() {
				var songShow = new Versa.Views.SongShow({ model: Versa.Store.song });
				that._swapView(songShow);
			},
		})
	},

	showArtist: function(id) {
		var that = this;
		Versa.Store.artist = Versa.Models.Artist.findOrCreate({id: id});
		Versa.Store.artist.fetch({
			success: function() {
				var artistShow = new Versa.Views.ArtistShow({ model: Versa.Store.artist });
				that._swapView(artistShow);
			},
		});
	},

	showAlbum: function(id) {
		var that = this;
		Versa.Store.album = Versa.Models.Album.findOrCreate({id: id});
		console.log(Versa.Store.album);
		Versa.Store.album.fetch({
			success: function() {
				var albumShow = new Versa.Views.AlbumShow({ model: Versa.Store.album });
				that._swapView(albumShow);
			}
		})
	},

	_swapView: function(view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		$('#content').html(view.render().$el);
	},


});