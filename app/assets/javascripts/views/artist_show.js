Versa.Views.ArtistShow = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

	template: JST['artists/show'],

  events: {
    "click .image-upload-button": "selectArtistImage",
    "dblclick .bio-text": "appendBioInput",
    "keypress": "bioInputFocusOut",
    "focusout .bio-input": "submitBioEdit",
  },

	render: function() {
		var renderedContent = this.template({artist: this.model});
		this.$el.html(renderedContent);
		return this;
	},

  selectArtistImage: function(event) {
    var that = this;
    event.preventDefault();
    filepicker.pickAndStore(
      {mimetype:"image/*"},
      {location:"S3"},
      function(InkBlobs) {
        var InkBlob = InkBlobs[0];
        that.setArtistImage(InkBlob.url);
        return InkBlob.url;
      });
  },

  setArtistImage: function(imageUrl) {
    this.model.save({'avatar_url': imageUrl});
  },

  appendBioInput: function(event) {
    event.preventDefault();
    var text = $('.bio-text').text();
    var $input = $('<input>').attr({
      'class': "bio-input",
      'type': "text",
      'placeholder': "Press enter or click outside of box to submit edits.",
      'value': text
    });
    $('.bio').html($input);
  },

  bioInputFocusOut: function(event) {
    if (event.keyCode == 13) {
      $('.bio-input').focusout();
    }
  },

  submitBioEdit: function() {
    var bioText = $('.bio-input').val();
    this.model.save({'bio': bioText});
  },



});