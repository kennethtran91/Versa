Versa.Views.SongPicker = Backbone.View.extend({
  template: JST['songs/picker'],

  render: function() {
    var renderedContent = this.template({songs: this.collection});
    this.$el.html(renderedContent);
    return this;
  },

  
});