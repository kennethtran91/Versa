Versa.Views.SongPicker = Backbone.View.extend({
  template: JST['songs/picker'],

  events: {
    "render:success": "initAutocomplete",
    "click li.song-button": "displaySong",
  },

  className: "song-picker",

  songButton: function(song) {
    $li = $('<li>').attr('class', 'btn btn-small btn-block btn-primary song-button');
    song_contents = "<h6>" 
                    + song.escape('title') 
                    + "</h6><p>"
                    + song.get('artist').escape('name') 
                    + "</p>"
    $li.html(song_contents);
    return $li;
  },

  render: function() {
    var renderedContent = this.template({songs: this.collection});
    this.$el.html(renderedContent);
    // this.$el.trigger("render:success");
    return this;
  },

  initAutocomplete: function() {
    $('input#songs').autocomplete({
      source: this.getSongs,
      minLength: 1
    });
  },

  getSongs: function(request, response) {
    console.log("shoudl get songs")
    var params = { keywords: request.term };
    $.get("/songs/search", params, function(data){
        response(data);
    }, "json");
  },

  displaySong: function(event) {
    event.preventDefault();
    var id = $(event.target).data('id')
    var url = "/songs/" + id
    Versa.Store.router.navigate(url, true);
  },

  songButton: function() {
  },

});