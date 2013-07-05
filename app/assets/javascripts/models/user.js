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

	}]
})