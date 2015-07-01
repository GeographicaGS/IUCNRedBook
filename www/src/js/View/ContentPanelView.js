'use strict';

App.View.ContentPanel = Backbone.View.extend({

    _template : $('#contentPanel-content_panel_template').html(),

    events: {
        'click .resize-handle': 'toggleOpen',
        'click .skip-intro': 'toggleAbout'
    },

    initialize: function() {
        this.render();
        this.$contentEl = this.$el.find("#content");
        this.$aboutEl = this.$el.find("#about");
    },

    onClose: function(){
        // Remove events on close
        this.stopListening();
    },

    render: function() {
        this.$el.html(Mustache.render(this._template, {
          // Params
        }));
        return this;
    },

    toggleOpen: function(ev) {
      ev.preventDefault();
      this.$contentEl.toggleClass('open');
    },

    toggleAbout: function(ev) {
      ev.preventDefault();
      this.$aboutEl.toggleClass('hide');
    },
});
