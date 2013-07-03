Versa.Models.Song = Backbone.RelationalModel.extend({
	relations: [{
		type: 'HasMany',
		key: 'annotations',
		relatedModel: 'Versa.Models.Annotation',
		collectionType: 'Versa.Collections.Annotations',
		includeInJSON: false,
		reverseCollection: {
			key: "song",
			keySource: "song_id",
			includeInJSON: "id"
		}
	},
	
	{
		type: 'HasMany',
		key: 'albumTracks',
		relatedModel: 'Versa.Models.AlbumTrack',
		collectionType: 'Versa.Collections.AlbumTracks',
		includeInJSON: false,
		reverseCollection: {
			key: "track",
			keySource: "track_id",
			includeInJSON: "id"
		}
	}]
});