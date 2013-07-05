Versa.Models.Album = Backbone.RelationalModel.extend({
	relations: [{
		type: 'HasMany',
		key: 'album_tracks',
		relatedModel: 'Versa.Models.AlbumTrack',
		collectionType: 'Versa.Collections.AlbumTracks',
		includeInJSON: false,
	},
	{
		type: 'HasOne',
		key: 'artist',
		keySource: 'artist_id',
		relatedModel: 'Versa.Models.Artist',
		collectionType: 'Versa.Collections.Artists',
		includeInJSON: false,
	}],

	urlRoot: "/albums/",
});