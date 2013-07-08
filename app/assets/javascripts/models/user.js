Versa.Models.User = Backbone.RelationalModel.extend({
	relations: [
	{
		type: Backbone.HasMany,
		key: 'annotations',
		relatedModel: 'Versa.Models.Annotation',
		collectionType: 'Versa.Collections.Annotations',
		includeInJSON: false,
		reverseRelation: {
			key: 'annotator',
			keySource: 'annotator',
			includeInJSON: false,
		}

	},
	{
		type: Backbone.HasMany,
		key: 'followings',
		keySource: 'followings',
		autoFetch: true,
		relatedModel: 'Versa.Models.Following',
		collectionType: 'Versa.Collections.Followings',
		includeInJSON: false
	},
	{
		type: Backbone.HasMany,
		key: 'follows',
		keySource: 'follows',
		autoFetch: true,
		relatedModel: 'Versa.Models.Following',
		collectionType: 'Versa.Collections.Followings',
		includeInJSON: false
	}],

	urlRoot: "/users/"
});