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
		"render:success": "highlightAnnotatedText",
		"click a.annotation": "displayAnnotation",
		"mouseup #lyrics": "captureSelectedText",
		"click .annotateButton": "showAnnotationForm",
		"click": "hideAnnotateButton",
		"annotationCreated": "displayCreatedAnnotation"
	},

	render: function() {
		var artist = this.model.get('artist');
		var albums = this.model.get('albums');
		var annotations = this.model.get('annotations');
		var renderedContent = this.template({
			song: this.model,
			artist: artist,
			albums: albums,
			annotations: annotations});
		this.$el.html(renderedContent);
		this.$el.trigger("render:success");
		return this;
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
		});
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
			range.collapse(false);
			var dummy = document.createElement("span");
			range.insertNode(dummy);
			var rect = dummy.getBoundingClientRect();
			var x = rect.right + window.scrollX;
			var y = rect.top + window.scrollY;
			this.coords = [x, y]
			dummy.parentNode.removeChild(dummy);

			var substr = window.getSelection().toString();
			Versa.Store.startChar = body.indexOf(substr);
			Versa.Store.endChar = Versa.Store.startChar + substr.length;

			this.annotateButton(this.coords);
		};
	},

	annotateButton: function(coords) {
	  var $button = $('<a>').text('Annotate').attr({"class": "btn btn-small btn-block btn-warning", "href": "#"});
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

	hideAnnotateButton: function(event) {
		if (event.target.id != ".annotateButton") {
			console.log($('.annotateButton').find('button'));
			console.log($('.annotateButton').find('button').size());
			if ($('.annotateButton').size()) {
		    $('.annotateButton').remove();
		  };
		};
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