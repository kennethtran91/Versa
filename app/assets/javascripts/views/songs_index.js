Versa.Views.SongsIndex = Backbone.View.extend({

	initialize: function() {
		var that = this;
		var events = ["add", "remove"];
		_(events).each(function (event) {
			that.listenTo(that.collection, event, that.render);
		});
	},

	template: JST['songs/index'],

	events: {
		"change #search_div" : "showSelection",
	},

	render: function() {
		var renderedContent = this.template({songs: this.collection});
		this.$el.html(renderedContent);
		return this;
	},

	renderSearch: function() {
		$("#search_div").select2({
	    width: '90%',
	    placeholder: "Search",
	    minimumInputLength: 2,
	    ajax: {
	      url: "/songs/search/",
	      dataType: "json",
	      data: function(term, page) {
	        return {
	          q: term,
	        };
	      },
	      results: function(data, page) {
	        var results = [];
	        _(data).each( function(song) {
	          var result = {
	            id: song.id,
	            text: song.title + " - " + song.artist.name
	          };
	          results.push(result);
	        });
	        return {results: results};
	      },
	    },
	  });
	},

	showSelection: function(data) {
		Versa.Store.router.navigate("/songs/" + data.val, true);
	},

});