Versa.Views.UserShow = Backbone.View.extend({

	initialize: function() {
		this.listenTo(Versa.Store.current_user, "sync", this.render);
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
		this.appendFollowButton();
		return this;
	},

	followingCurrentUser: function() {
    var usersFollowingCurrentUser = [];
    var followings = Versa.Store.current_user.get('followings')
    followings.each(function(following) {
      var user = following.get('follower');
      usersFollowingCurrentUser.push(user);
    });

    return usersFollowingCurrentUser;
  },

  currentUserFollows: function() {
    var followedByCurrentUser = [];
    var follows = Versa.Store.current_user.get('follows');
    follows.each(function(follow) {
      var user = follow.get('followed');
      followedByCurrentUser.push(user);
    });
    return followedByCurrentUser;
  },

  isFollowed: function() {
  	var that = this;
  	var followed = null;
  	_.each(this.currentUserFollows(), function(user) {
  		console.log("checking user" + user.id);
  		if (user.id == that.model.id) {
  			followed = true;
  		}
  	});

  	return followed;
  },

  appendFollowButton: function() {
  	$button = $('<a>').attr('class', 'btn btn-warning');
  	if (this.isFollowed()) {
  		$button.addClass('unfollow-user')
  		$button.text("Unfollow User");
  		$('.follow-button').append($button);	
  	} else {
  		$button.addClass('follow-user');
  		$button.text("Follow User");
  		$('.follow-button').append($button);	
  	}
  },

	followUser: function() {
		event.preventDefault();
		var that = this;
		var id = this.model.id;
		$.ajax({
			url: "/users/" + id + "/followings",
			type: "post",
			success: function(data) {
				Versa.Store.current_user.fetch();
				that.model.fetch()
				// $('a.follow-user').remove();
				// $button = $('<a>').attr('class', 'btn btn-warning unfollow-user')
				// 									.text("Unfollow User");
				// $('.follow-button').append($button);
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
				Versa.Store.current_user.fetch();
				that.model.fetch()
				// $('a.unfollow-user').remove();
				// $button = $('<a>').attr('class', 'btn btn-warning follow-user')
				// 									.text("Follow User");
				// $('.follow-button').append($button);
			},
		}) 
	},
	
});