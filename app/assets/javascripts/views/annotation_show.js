Versa.Views.AnnotationShow = Backbone.View.extend({

	initialize: function() {
		var that = this;
		var events = ["add", "change", "remove", "destroy", "sync"];
		_(events).each(function (event) {
			that.listenTo(that.model, event, that.render);
		});
	},

	template: JST['annotations/show'],

	events: {
		"click a.vote" : "vote",
		"click .userLink" : "closeAnnotation",
	},

	render: function() {
		var that = this;
		var renderedContent = that.template({song: Versa.Store.song, annotation: that.model});
		that.$el.html(renderedContent);
		return that;
	},

	vote: function(event) {
		var that = this;
		var route = ($(event.target).hasClass('like') ? "like" : "dislike");

		$.ajax({
			url: "/annotations/" + that.model.id + "/" + route,
			method: "post",
			success: function(data) {
				that.model.fetch();
			},
			error: function(data) {
				alert("You can't vote twice.");
			}
		})
	},

	closeAnnotation: function(event) {
		$('.annotationDiv').bPopup().close();
	},

});