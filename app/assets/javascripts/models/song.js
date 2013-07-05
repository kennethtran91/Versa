Versa.Models.Song = Backbone.RelationalModel.extend({
	relations: [{
		type: 'HasMany',
		key: 'annotations',
		relatedModel: 'Versa.Models.Annotation',
		collectionType: 'Versa.Collections.Annotations',
		includeInJSON: false,
		reverseCollection: {
			key: "song",
			keySource: "song",
			includeInJSON: false
		}
	},
	
	{
		type: 'HasMany',
		key: 'album_tracks',
		relatedModel: 'Versa.Models.AlbumTrack',
		collectionType: 'Versa.Collections.AlbumTracks',
		includeInJSON: false,
	}],

});