'use strict';

App.View.ContentPanel = Backbone.View.extend({

    _template : $('#contentPanel-content_panel_template').html(),

    events: {
        'click .resize-handle': 'toggleOpen',
        'click .skip-intro': 'toggleAbout',
        'click .close-help': 'toggleHelp',
    },

    initialize: function() {
        this.render();
        this.$contentEl = this.$el.find("#content");
        this.$aboutEl = this.$el.find("#about");
        this.$helpEl = this.$el.find("#help");
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

    toggleOpen: function(ev, force) {
        ev.preventDefault();
        if(force === undefined){
            this.$contentEl.toggleClass('open');
            this.trigger('open');
        }else{
            this.$contentEl.toggleClass('open', force);
        }
    },

    toggleAbout: function(ev, force) {
      ev.preventDefault();
      if(force === undefined){
          $('.main-nav .to-about').toggleClass('active');
          this.$aboutEl.toggleClass('hide');
      }else{
          $('.main-nav .active').removeClass('active');
          $('.main-nav .to-about').toggleClass('active', force);
          this.$aboutEl.toggleClass('hide', !force);
      }
    },

    toggleHelp: function(ev, force) {
      ev.preventDefault();
      if(force === undefined){
          $('.main-nav .to-help').toggleClass('active');
          this.$helpEl.toggleClass('hide');
      }else{
          $('.main-nav .active').removeClass('active');
          $('.main-nav .to-help').toggleClass('active', force);
          this.$helpEl.toggleClass('hide', !force);
      }
    },
});
