Versa.Views.SongShow = Backbone.View.extend({
	
	initialize: function() {
		var that = this;
		var events = ["add", "change", "remove", "destroy", "sync"];
		_(events).each(function (event) {
			that.listenTo(that.model, event, that.render);
		});

	},

	className: 'song_lyrics',

	template: JST["songs/show"],

	events: {
		"dblclick .about-click": "appendAboutInput",
		"keypress": "focusOut",
		"focusout .about-song-input": "submitAbout",
		"render:success": "highlightAnnotatedText",
		"click a.annotation": "displayAnnotation",
		"mouseup #lyrics": "captureSelectedText",
		"click .annotateButton": "showAnnotationForm",
		"annotationCreated": "displayCreatedAnnotation"
	},

	render: function() {
		this.getAssociatedModels();
		var renderedContent = this.template({
			song: this.model,
			artist: this.artist,
			albums: this.albums,
			annotations: this.annotations});
		this.$el.html(renderedContent);
		this.$el.trigger("render:success");
		return this;
	},

	getAssociatedModels: function() {
		this.artist = this.model.get('artist');
		this.albums = this.model.get('albums');
		this.annotations = this.model.get('annotations');
	},

	focusOut: function(e) {
		if (e.keyCode == 13) {
			$('.about-song-input').focusout();
		};
	},

	appendAboutInput: function() {
		var text = $('.about-click').text();
		var $input = $('<input>').attr({
				'data-id': this.model.id,
					'class': 'about-song-input',
				   'type': 'text',
		'placeholder': "Click outside to submit edits.",
					'value': text
		});
		$('.about').html($input);
	},

	submitAbout: function(event) {
		var songID = $(event.target).data('id');
		var aboutInput = $(event.target).val();
		var attrs = {
				'song_info': aboutInput
			};

		this.model.set(attrs);
		Backbone.sync("update", this.model);
	},

	highlightAnnotatedText: function() {
		var that = this;
		var $lyrics = $('#lyrics');
		var text = $lyrics.text();

		that.model.get('annotations').each(function(annotation) {
			var start_char = annotation.get('start_char');
			var end_char = annotation.get('end_char');
			var substr = text.substr(start_char, end_char - start_char);
			$lyrics.highlight(substr);

			that.attachLinkToAnnotation(substr, annotation);
		});
	},

	attachLinkToAnnotation: function(substr, annotation) {
		$('.highlight').each(function() {
			var text = $(this).text();
			if (text === substr) {
				$(this).wrap(function() {
					var id = annotation.id;
					var url = "#/annotations/" + id;
					var $link = $('<a>').addClass('annotation').attr('href', url).attr('data-id', id);
					return $link;
				})
			}
		})
	},

	annotationPopUp: function(annotation) {
		var annotationShow = new Versa.Views.AnnotationShow({model: annotation});
		$(".annotationDiv").html(annotationShow.render().$el);
		$(".annotationDiv").bPopup({
			position: ['65%', 'auto'],
			zIndex: 1,
			closeClass: 'annotateClose',
			opacity: 0.1,
			follow: false,
	    modalColor: '#FFF',
	    opacity: 0,
		});
	},

	displayAnnotation: function(event) {
		var that = this;
		event.preventDefault();
		event.stopPropagation();
		var annotationID = $(event.target).parent().data('id');
		var annotation = that.model.get('annotations').get(annotationID);
		annotation.fetch({
			success: function() {
				that.annotationPopUp(annotation);
			},
		});
	},

	captureSelectedText: function(event) {
		event.stopPropagation();
		var body = $('#lyrics').text();
		var range = window.getSelection().getRangeAt(0);

		if (range.endOffset - range.startOffset) {
			this.getCoordsOfSelection(range);

			//capture the selected text
			var substr = window.getSelection().toString();

			// get the index of the start and end chars of the annotated 
			// text to avoid saving the text twice
			Versa.Store.startChar = body.indexOf(substr);
			Versa.Store.endChar = Versa.Store.startChar + substr.length;

			this.annotateButton(this.coords);
		} else {
			this.hideAnnotateButton();
		}
	},

	getCoordsOfSelection: function(range) {
		//create a "dummy" span to capture the coordinates of the end of the selection
		range.collapse(false);
		var dummy = document.createElement("span");
		range.insertNode(dummy);
		var rect = dummy.getBoundingClientRect();
		var x = rect.right + window.scrollX;
		var y = rect.top + window.scrollY;
		this.coords = [x, y]
		dummy.parentNode.removeChild(dummy);
	},

	annotateButton: function(coords) {
	  var $button = $('<a>').text('Annotate')
	  									.attr({
	  										"class": "btn btn-small btn-block btn-warning", 
	  										 "href": "#"});
	  var $annotateDiv = $('<div>')
	                    .attr({'class':'annotateButton'})
	                    .css({
	                      'left': coords[0] - 80 + 'px',
	                       'top': coords[1] - 38 + 'px'
	                    })
	                    .append($button);

	  if ($('.annotateButton').size()){
	    $('.annotateButton').css({
	      'left': coords[0] + 'px',
	       'top': coords[1] + 'px'
	    })
	  } else {
	    this.$el.append($annotateDiv);
	  };

	},

	hideAnnotateButton: function() {
		$('.annotateButton').remove();
	},	

	showAnnotationForm: function(event) {
		event.preventDefault();
    event.stopPropagation();
    this.popUpAnnotationForm(this.coords);
    $('.annotateButton').remove();
	},

	popUpAnnotationForm: function(coords) {
	  var $form = $('.annotationDiv');

	  var annotationForm = new Versa.Views.AnnotationForm();
	  $form.html(annotationForm.render().$el);

	  $form.bPopup({
	    follow: false,
	    modalColor: '#FFF',
	    zIndex: 1,
	    opacity: 0,
	    positionStyle: 'absolute',
	    position: [coords[0] + 50 + 'px', 'auto'],
	    closeClass: 'annotateClose',
	    onClose: function() {
	    	$form.empty();
	    },
	  });
	},

	displayCreatedAnnotation: function() {
		var that = this;
		that.render();
		var annotation = that.model.get('annotations').get(Versa.Store.LastCreatedAnnotationID);
		annotation.fetch({
			success: function() {
				that.annotationPopUp(annotation);
			},
		});
	},


});