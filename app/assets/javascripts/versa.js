window.Versa = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  }
};

$(document).ready(function(){
  Versa.initialize();

  $('#lyrics').on("mousedown", function() {
  	$(this).on("mouseup", function(event) {
  		var body = $(this).text();
  		var text = window.getSelection();
  		if (text.type == "Range") {
  		console.log(text);
  	};
  	});
  });
});

