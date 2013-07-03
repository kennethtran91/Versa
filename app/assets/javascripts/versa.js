window.Versa = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  }
};

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
      var $link = $('<a>').attr('href', url);

      return $link;

    });
  });
};

Versa.captureSelectedText = function() {

  $('#lyrics').on("mousedown", function() {

    $(this).on("mouseup", function(event) {
      var body = $(this).text();
      console.log(body);
      var range = window.getSelection().getRangeAt(0);
      console.log(range);
    if (range.endOffset - range.startOffset) {
      if (range.endOffset - range.startOffset > 0) {
      Versa.startChar = range.startOffset;
      Versa.endChar = range.endOffset;
    } else if (range.startOffset - range.endOffset > 0) {
      Versa.startChar = range.endOffset;
      Versa.endChar = range.startOffset;
    }
     
      range.collapse(false);
      var dummy = document.createElement("span");
      range.insertNode(dummy);
      var rect = dummy.getBoundingClientRect();
      var substr = body.substr(Versa.startChar, Versa.endChar - Versa.startChar);
      
      console.log(Versa.startChar, Versa.endChar);
      console.log(substr);

      var x = rect.right + window.scrollX;
      var y = rect.top + window.scrollY;
      dummy.parentNode.removeChild(dummy);

      Versa.annotateButton([x,y]);
    }
    });
  });
};

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

Versa.hideAnnotateButton = function() {
  $('body').on('click', function() {
  if ($('.annotateButton').size()) {
    $('.annotateButton').remove();
  };
  });
};

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

Versa.fillPopUpFormInfo = function(){
  $form = $('.annotateForm').find('form');
  $form.find('input#annotation_start_char').val(Versa.startChar);
  $form.find('input#annotation_end_char').val(Versa.endChar);
};

Versa.closeAnnotationForm = function() {
  $('a.closeFormLink').on('click',function(event) {
    event.preventDefault();
    $('.annotateForm').bPopup().close();
  });
};

$(document).ready(function(){
  Versa.initialize();
  Versa.captureSelectedText();

  if ($('#lyrics').size()) {
    Versa.highlightAnnotatedText();
  };
});

