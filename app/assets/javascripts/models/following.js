Versa.Models.Following = Backbone.RelationalModel.extend({
	relations: [{
		type: Backbone.HasOne,
		key: 'followed',
		keySource: 'followed_id',
		relatedModel: 'Versa.Models.User',
		collectionType: 'Versa.Collections.Users',
		autoFetch: true,
		includeInJSON: false
	},
	{
		type: Backbone.HasOne,
		key: 'follower',
		keySource: 'follower_id',
		relatedModel: 'Versa.Models.User',
		collectionType: 'Versa.Collections.Users',
		autoFetch: true,
		includeInJSON: false
	}]
});