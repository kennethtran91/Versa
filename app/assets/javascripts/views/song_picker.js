Versa.Views.SongPicker = Backbone.View.extend({
  initialize: function() {
    var that = this;
    this.listenTo(this.collection, "add", this.render);
  },

  template: JST['songs/picker'],

  events: {
    "render:success": "initAutocomplete",
    "click li.song-button": "displaySong",
    "stop-song": "stopCurrentSong",
    "keyup #songSearch": "fillSongPicker"
  },

  className: "song-picker",

  render: function() {
    var renderedContent = this.template({songs: this.collection});
    this.$el.html(renderedContent);
    // this.$el.trigger("render:success");
    return this;
  },

  songButton: function(song) {
    $li = $('<li>').attr({
      'class': 'btn btn-small btn-block btn-primary song-button',
      'data-id': song.id });
    song_contents = song.title 
                    + "<br>"
                    + song.artist.name;
    $li.append(song_contents);
    return $li;
  },

  songButtonRefill: function(song) {
    $li = $('<li>').attr({
      'class': 'btn btn-small btn-block btn-primary song-button',
      'data-id': song.id });
    song_contents = song.get('title') 
                    + "<br>"
                    + song.get('artist').escape('name');
    $li.append(song_contents);
    return $li;
  },

  initAutocomplete: function() {
    var that = this;
    $('input#songSearch').autocomplete({
      search: function(event, ui) {
        $('.song-list').empty();
      },
      source: this.getSongs,
      minLength: 1,
      messages: {
        noResults: '',
        results: function() {}
      },
      }).data('ui-Autocomplete')
        ._renderItem = function(ul, item) {
          console.log(item);
        var button = that.songButton(item);
        return button
        .appendTo($('.song-list'));
      };
  },

  getSongs: function(request, response) {
    console.log("shoudl get songs")
    var params = { keywords: request.term };
    $.get("/songs/search", params, function(data){
        response(data);
    }, "json");
  },

  fillSongPicker: function(event) {
    var that = this;
    if (!$("#songSearch").val()) {
      $('.song-list').empty();
      this.collection.each(function(song) {
        var button = that.songButtonRefill(song);
        button.appendTo($('.song-list'));
      });
    };
  },

  displaySong: function(event) {
    event.preventDefault();
    var id = $(event.target).data('id')
    var song = Versa.Store.songs.get(id)
    var url = "/songs/" + id
    Versa.Store.router.navigate(url, true);
    if (song.get("soundcloud_url")) {
      this.playSong(song);
    };
  },

  playSong: function(song) {
    var that = this;
    if (Versa.Store.currentSong) {
      this.$el.trigger('stop-song');
    };
    soundcloud_url = song.get("soundcloud_url")
    SC.stream(soundcloud_url, function(sound){
      Versa.Store.currentSong = sound;
      sound.play();
    })

    Versa.makePauseButton();
  },

  stopCurrentSong: function() {
    console.log("WHERE IS IT");
    Versa.Store.currentSong.stop();
    Versa.makePlayButton();
  },

  renderSearch: function() {
    $(".search-field").select2({
      width: '90%',
      placeholder: "Search",
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
      },
    });
  },

});