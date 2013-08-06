Versa.Views.AnnotationForm = Backbone.View.extend({
	template: JST['annotations/form'],

	events: {
		"click .submit-button": "newAnnotation",
		"click a.image-upload-button": "selectImage",
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
	},

	newAnnotation: function(event) {
		var that = this;
		event.preventDefault();
		var attrs = $(event.target.form).serializeJSON();
		var songID = Versa.Store.song.id;
		attrs.annotation.song_id = songID

		var newAnnotation = new Versa.Models.Annotation();
		newAnnotation.save(attrs['annotation'], {
			success: function(data) {
				that.saveAnnotation(data);
			}
		})
	},

	selectImage: function(event) {
		var that = this;
		event.preventDefault();
		filepicker.pickAndStore(
			{mimetype:"image/*"},
			{location:"S3"},
			function(InkBlobs) {
				var InkBlob = InkBlobs[0];
				$('a.image-upload-button').remove();
				$('input.image-url').val(InkBlob.url);
				var $img = $('<img>').attr('src', InkBlob.url);
				$('span.annotation-image').append($img);
				return InkBlob.url;
			});
	},

	saveAnnotation: function(data) {
		Versa.Store.LastCreatedAnnotationID = data.get('id');
		Versa.Store.song.get('annotations').add(data);
		Versa.Store.song.save;
		$('.annotationDiv').bPopup().close();
		$('.song_lyrics').trigger("annotationCreated");
	},

});