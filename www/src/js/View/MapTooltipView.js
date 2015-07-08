'use strict';

App.View.MapTooltip = Backbone.View.extend({

    _template: $('#map-tooltip_template').html(),

    events: {
        'click .toPDF': 'openPdf',
    },

    initialize: function() {
        //this.render();
    },

    onClose: function() {
        // Remove events on close
        this.stopListening();
    },

    render: function() {
        this.$el.html(Mustache.render(this._template, this.model ));
        return this;
    },

    openPdf: function(e) {
        e.preventDefault();
        var $target = $(e.target);
        var docPath = App.config.static_path + 'pdf/' + $target.data('doc') + '#page=' + $target.data('page');
        $('#pdf-viewer object').attr('data', docPath);
        this.trigger('openPdf');
        // While events did not work...
        $('.main-nav .active').removeClass('active');
        $('#about').addClass('hide');
        $('#help').addClass('hide');
        $('#content').addClass('open');
        $('#map').addClass('shrink');
    },
});
