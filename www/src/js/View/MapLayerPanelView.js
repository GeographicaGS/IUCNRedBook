'use strict';

App.View.MapLayerPanel = Backbone.View.extend({

    _template: $('#mapLayerPanel-layer_panel_template').html(),
    _addLayerPanel: null,

    events: {
        'click .legend-expand': 'toggleOpen',
        'click .addLayer': 'showAddLayerPanel'
    },

    initialize: function() {
        this._addLayerPanel = new App.View.AddLayerPanel();
        this.listenTo(this._addLayerPanel, 'close', this.hideAddLayerPanel);
        this.listenTo(App.currentLayers, 'update', this.renderAll);
        this.render();
        this.$panelEl = this.$el.find("#legend-panel");
    },

    onClose: function(){
        // Remove events on close
        this.stopListening();
    },

    render: function() {
        this.$el.html(Mustache.render(this._template, App.BaseCatalog));
        this.$categoriesContainer = this.$('.panel-content .inner div');
        this.$('#addLayerPanel').html(this._addLayerPanel.el);
        App.baseCatalog.each(this.renderTab, this);
        this.$groupsContainer = this.$categoriesContainer.find('.layerItemGroup ul');

        return this;
    },

    renderAll: function() {
        this.$groupsContainer.empty();
        this.$panelEl.addClass('open');
        this.$categoriesContainer.children('.layerItemGroup').addClass('disabled');
        App.currentLayers.each(this.renderLayer, this);
    },

    renderTab: function(elem, index) {
        var topics = elem.get('topics');
        for (var i = 0; i < topics.length; i++){
            topics[i]['category'] = elem.get('title');
            topics[i]['icon'] = elem.get('icon');
            var group = new App.View.MapLayerGroup({model:topics[i]});
            this.$categoriesContainer.eq(index).append(group.render().$el);
        }
    },

    renderLayer: function(elem, index){
        var layer = new App.View.MapLayerItem({model:elem});
        var groupContainer = this.$groupsContainer.eq(elem.get('topic'));
        groupContainer.append(layer.render().$el);
        if(groupContainer.children().length)
            groupContainer.parent().parent().removeClass('disabled');
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

    refreshLayers: function(){
        this.$el.html(Mustache.render(this._template, App.currentLayers));
    },
});
