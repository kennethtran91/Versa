window.Versa = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function() {
  }
};

//song show page
Versa.highlightAnnotatedText = function() {
  var $lyrics = $('#lyrics')
  var text = $lyrics.text()

  _.each(song.annotations, function(annotation) {
    var start_char = annotation.start_char;
    var end_char = annotation.end_char;
    var substr = text.substr(start_char, end_char - start_char);
    
    $lyrics.highlight(substr);
    $('.highlight').last().wrap(function() {
      var id = annotation.id;
      var url = "/annotations/" + id;
      var $link = $('<a>').addClass('annotation').attr('href', url).attr('data-id', id);

      return $link;

    });
  });

  Versa.displayAnnotation();
};

//song show page
Versa.captureSelectedText = function() {

  $('#lyrics').on("mousedown", function() {
    $(this).on("mouseup", function(event) {
      event.stopPropagation();

      var body = $(this).text();
      
      var range = window.getSelection().getRangeAt(0);
      if (range.endOffset - range.startOffset) {
        range.collapse(false);
        var dummy = document.createElement("span");
        range.insertNode(dummy);
        var rect = dummy.getBoundingClientRect();
        var x = rect.right + window.scrollX;
        var y = rect.top + window.scrollY;
        dummy.parentNode.removeChild(dummy);
        
        var substr = window.getSelection().toString();
        Versa.startChar = body.indexOf(substr);
        Versa.endChar = Versa.startChar + substr.length;

        Versa.annotateButton([x,y]);
      };
    });
  });
};

//song show page
Versa.annotateButton = function(coords) {
  var $button = $('<button>').text('Annotate');
  var $annotateDiv = $('<div>')
                    .addClass('annotateButton')
                    .css({
                      'left': coords[0] + 'px',
                      'top': coords[1] + 'px'
                    })
                    .append($button);

  if ($('.annotateButton').size()){
    $('.annotateButton').css({
      'left': coords[0] + 'px',
      'top': coords[1] + 'px'
    })
  } else {
    $('body').append($annotateDiv);
  };

  $('.annotateButton').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    Versa.popUpAnnotationForm(coords);
    $(this).remove();
  });
  Versa.hideAnnotateButton();
};


//song show page
Versa.hideAnnotateButton = function() {
  $('body').on('click', function() {
  if ($('.annotateButton').size()) {
    $('.annotateButton').remove();
  };
  });
};

//song show page
Versa.popUpAnnotationForm = function(coords) {
  var $form = $('.annotateForm');
  $form.bPopup({
    follow: false,
    modalColor: '#FFF',
    opacity: 0,
    positionStyle: 'absolute',
    position: [coords[0] + 50 + 'px', 'auto'],
    closeClass: 'annotateClose'
  });
  Versa.fillPopUpFormInfo();
  Versa.closeAnnotationForm();
};

//song show page
Versa.fillPopUpFormInfo = function(){
  $form = $('.annotateForm').find('form');
  $form.find('input#annotation_start_char').val(Versa.startChar);
  $form.find('input#annotation_end_char').val(Versa.endChar);
};

//song show page
Versa.closeAnnotationForm = function() {
  $('a.closeFormLink').on('click',function(event) {
    event.preventDefault();
    $('.annotateForm').bPopup().close();
  });
};

//song show page
Versa.displayAnnotation = function() {
  $('a.annotation').on('click', function(event) {
    console.log('something');
    event.preventDefault();
    event.stopPropagation();
    var id = $(this).data('id');
    $('.annotationDiv').bPopup({
      loadUrl: '/annotations/' + id + '.html',
      closeClass: 'annotateClose',
      opacity: 0.1
    });
  });

  Versa.vote();
};

//annotation show page
Versa.vote = function() {
  $('button.vote').on('click', function(event) {
    event.preventDefault();
    if ($(this).is('.like')){
      var postUrl = "/annotations/" + annotationID + "/like";
    } else {
      var postUrl = "/annotations/" + annotationID + "/dislike";
    }

    $.ajax({
      url: postUrl,
      type: "post",
      });
  });  
};

$(document).ready(function(){
  
  Versa.initialize();
  Versa.authToken = $('meta[name="csrf-token"]').attr('content');
  //Add Versa current user

  Versa.captureSelectedText();

  if ($('#lyrics').size()) {
    Versa.highlightAnnotatedText();
  };
});

