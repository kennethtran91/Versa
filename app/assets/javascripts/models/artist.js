Versa.Models.Artist = Backbone.RelationalModel.extend({
	relations: [{
		type: Backbone.HasMany,
		key: 'songs',
		relatedModel: 'Versa.Models.Song',
		collectionType: 'Versa.Collections.Songs',
		includeInJSON: "id",
		reverseRelation: {
			key: 'artist',
			keySource: 'artist_id',
			includeInJSON: "id",
		}
	},
	{
		type: Backbone.HasMany,
		key: 'albums',
		keySource: 'albums',
		relatedModel: 'Versa.Models.Album',
		collectionType: 'Versa.Collections.Albums',
		// reverseRelation: {
		// 	key: 'artist',
		// 	keySource: 'artist_id',
		// 	includeInJSON: false
		// }
	}],

	urlRoot: "/artists/",
});