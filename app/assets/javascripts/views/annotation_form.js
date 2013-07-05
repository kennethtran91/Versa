Versa.Views.AnnotationForm = Backbone.View.extend({
	template: JST['annotations/form'],

	events: {
		"click input[type='submit']": "createAnnotation",
	},

	render: function() {
		var that = this;
		var renderedContent = this.template({song: Versa.Store.song});
		this.$el.html(renderedContent);
		this.fillPopUpFormInfo();
		return this;
	},

	fillPopUpFormInfo: function() {
	  this.$el.find('input#annotation_start_char').val(Versa.Store.startChar);
	  this.$el.find('input#annotation_end_char').val(Versa.Store.endChar);
	  console.log(Versa.Store.startChar);
	  console.log(Versa.Store.endChar);
	},

	createAnnotation: function(event) {
		event.preventDefault();
		var attrs = $(event.target.form).serializeJSON();
		var songID = Versa.Store.song.id;
		attrs.annotation.song_id = songID

		var newAnnotation = new Versa.Models.Annotation();
		newAnnotation.save(attrs['annotation'], {
			success: function(data) {
				Versa.Store.LastCreatedAnnotationID = data.get('id');
				Versa.Store.song.get('annotations').add(data);
				Versa.Store.song.save;
				$('.annotationDiv').bPopup().close();
				$('.song_lyrics').trigger("annotationCreated")
			}
		})
	},

});