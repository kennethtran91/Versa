window.Versa = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function() {
    Versa.Store.songs = new Versa.Collections.Songs();
    Versa.Store.songs.fetch({
      success: function() {
        Versa.Store.router = new Versa.Router($('body'));
        Backbone.history.start();
      }
    });
  }
};


$(document).ready(function(){
  
  Versa.initialize();
  Versa.Store.authToken = $('meta[name="csrf-token"]').attr('content');
  //Add Versa current user

  // Versa.captureSelectedText();

  // if ($('#lyrics').size()) {
  //   Versa.highlightAnnotatedText();
  // };
});

