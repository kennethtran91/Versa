Versa.Models.AlbumTrack = Backbone.RelationalModel.extend({
	relations: [{
		type: 'HasOne',
		key: 'album',
		keySource: 'album_id',
		relatedModel: 'Versa.Models.Album',
		collectionType: 'Versa.Collections.Albums',
		includeInJSON: false,
	},
	{
		type: 'HasOne',
		key: 'track',
		keySource: 'track_id',
		relatedModel: 'Versa.Models.Song',
		collectionType: 'Versa.Collections.Songs',
		includeInJSON: false,
	}]
})