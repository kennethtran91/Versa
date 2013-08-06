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
  },

  makePauseButton: function() {
    $('span.fui-play').removeClass().addClass('fui-pause');
    $('span.fui-pause').on('click', function() {
      Versa.Store.songPicker.$el.trigger('stop-song');
    })
  },

  makePlayButton: function() {
    $('span.fui-pause').removeClass().addClass('fui-play');
  },
};


$(document).ready(function(){
  
  Versa.initialize();
  Versa.Store.authToken = $('meta[name="csrf-token"]').attr('content');

});

