Versa.Models.Artist = Backbone.RelationalModel.extend({
	relations: [{
		type: Backbone.HasMany,
		key: 'songs',
		relatedModel: 'Versa.Models.Song',
		collectionType: 'Versa.Collections.Songs',
		reverseRelation: {
			key: 'artist',
			keySource: 'artist_id',
			includeInJSON: "id",
		}
	}]
});