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

  $("#search_input").select2({
    width: '180px',
    placeholder: "Searching...",
    minimumInputLength: 2,
    ajax: {
      url: "/songs/search/",
      dataType: "json",
      data: function(term, page) {
        return {
          q: term,
        };
      },
      results: function(data, page) {
        var results = [];
        _(data).each( function(song) {
          var result = {
            id: song.id,
            text: song.title + " - " + song.artist.name
          };
          results.push(result);
        });
        return {results: results};
      },
      formatResult: function(song, node) {
        console.log(node);
        return JST['songs/search']({song: song}); },
    },
  });
});

