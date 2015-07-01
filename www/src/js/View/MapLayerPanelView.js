'use strict';

App.View.MapLayerPanel = Backbone.View.extend({

    _template: $('#layerPanel-layer_panel_template').html(),
    _addLayerPanel: null,

    events: {
        'click .legend-expand': 'toggleOpen',
        'click .addLayer': 'showAddLayerPanel'
    },

    initialize: function() {
        this._addLayerPanel = new App.View.AddLayerPanel();
        this.listenTo(this._addLayerPanel, 'close', this.hideAddLayerPanel);
        this.listenTo(this._addLayerPanel, 'layerAdd', this.addLayer);
        this.listenTo(this._addLayerPanel, 'layerDel', this.removeLayer);

        this.render();
        this.$panelEl = this.$el.find("#legend-panel");
    },

    onClose: function(){
        // Remove events on close
        this.stopListening();
    },

    render: function() {
        this.$el.html(Mustache.render(this._template, {}));
        this.$('#addLayerPanel').html(this._addLayerPanel.el);
        return this;
    },

    toggleOpen: function(ev) {
        if(ev)
            ev.preventDefault();
        this.$panelEl.toggleClass('open');
    },

    showAddLayerPanel: function(ev) {
        if(ev)
            ev.preventDefault();

        this.$panelEl.toggleClass('hide');
        this._addLayerPanel.openPanel();
    },

    hideAddLayerPanel: function(ev) {
        if(ev)
            ev.preventDefault();

        this.$panelEl.toggleClass('hide');
    },

    addLayer: function(layer){
        console.dir(layer);
    },

    removeLayer: function(layer){
        console.dir(layer);
    },
});
