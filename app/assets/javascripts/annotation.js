Versa.Models.Annotation = Backbone.RelationalModel.extend({
	relations:[{
		type: Backbone.HasOne,
		key: "song",
		keySource: "song_id",
		relatedModel: "Versa.Models.Song",
		collectionType: "Versa.Collections.Songs",
		includeInJSON: false,
	}],

	urlRoot: "/annotations/",

});