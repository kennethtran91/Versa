Versa.Models.Album = Backbone.RelationalModel.extend({
	relations: [{
		type: 'HasMany',
		key: 'albumTracks',
		relatedModel: 'Versa.Models.AlbumTrack',
		collectionType: 'Versa.Collections.AlbumTracks',
		includeInJSON: false,
		reverseCollection: {
			key: "album",
			keySource: "album_id",
			includeInJSON: "id"
		}
	}]
});