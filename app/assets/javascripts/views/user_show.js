Versa.Views.UserShow = Backbone.View.extend({

	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
	},

	template: JST['users/show'],

	events: {
		"click .follow-user": "followUser",
		"click .unfollow-user": "unfollowUser"
	},

	render: function() {
		var renderedContent = this.template({user: this.model});
		this.$el.html(renderedContent);
		return this;
	},

	followUser: function() {
		event.preventDefault();
		var that = this;
		var id = this.model.id;
		$.ajax({
			url: "/users/" + id + "/followings",
			type: "post",
			success: function(data) {
				that.model.fetch();
			},
		}); 
	},

	unfollowUser: function() {
		event.preventDefault();
		var that = this;
		var id = this.model.id;
		$.ajax({
			url: "/users/" + id + "/followings",
			type: "delete",
			success: function(data) {
				that.model.fetch();
			},
		}) 
	},
	
});