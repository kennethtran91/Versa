Versa.Views.SongForm = Backbone.View.extend({
	template: JST['songs/new'],

	events: {
		"click input[type='submit']": "createSong",
	},

	render: function() {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},

	createSong: function(event) {
		event.preventDefault();
		var encData = $(event.target.form).serializeJSON();
		console.log(encData);
		$.ajax({
			url: "/songs/",
			type: "post",
			data: encData,
			success: function(data) {
				Versa.Store.songs.add(data);
				Versa.Store.router.navigate("songs/" + data.id, true);
			},
			error: function(data) {
				alert("Failed to create song");
			},
		})
		// var newSong = new Versa.Models.Annotation();
		// newAnnotation.save(attrs['annotation'], {
		// 	success: function(data) {
		// 		Versa.Store.LastCreatedAnnotationID = data.get('id');
		// 		Versa.Store.song.get('annotations').add(data);
		// 		Versa.Store.song.save;
		// 		$('.annotationDiv').bPopup().close();
		// 		$('.song_lyrics').trigger("annotationCreated")
		// 	}
		// })
	},
});