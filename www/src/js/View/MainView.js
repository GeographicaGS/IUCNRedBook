'use strict';

App.View.Main = Backbone.View.extend({
    el: '#main',
    _template : $('#main-main_template').html(),
    _contentPanel: null,
    _layerPanel: null,
    _map: null,

    initialize: function(options) {
        this._contentPanel = new App.View.ContentPanel();
        this._layerPanel = new App.View.MapLayerPanel();
        this.render();
    },

    onClose: function(){
        this._contentPanel.close();
        this._layerPanel.close();
        this._map.close();
        this.stopListening();
        $('nav .to-about').off('click');
        $('nav .to-help').off('click');
    },

    render: function(ctxData) {
    	this.$el.html(this._template);
        this._map = new App.View.Map({el: this.$('#map')}),
        this.listenTo(this._contentPanel, 'open', this.toggleShrinkMap);
        this.listenTo(this._map, 'openPdf', this.toggleOpenContent);
        this.$('#contentPanel').html(this._contentPanel.el);
        this.$('#layerPanel').html(this._layerPanel.el);
        $('nav .to-about').on('click', {context: this}, this.showAbout);
        $('nav .to-help').on('click', {context: this}, this.showHelp);
		return this;
    },

    searchLayer: function(id) {
		var result = null;
		App.Catalog.categories.forEach(function(category) {
			category.topics.forEach(function(topic) {
				topic.layers.forEach(function(layer) {
				    if (layer.id == id){
				    	return result = layer;
				    }
				});
			});
		});
		return result;
	},

	searchLayerGroup: function(layer) {
		var cat_index = 0, found = false;

		while(!found && cat_index < app.categories.length){
			var topic_index = 0;
			while(!found && topic_index < App.Catalog.categories[cat_index].topics.length){
				if(App.Catalog.categories[cat_index].topics[topic_index].layers.indexOf(layer) != -1)
					found = true;
				topic_index++;
			}
			if(!found)
				cat_index++;
		}

		return cat_index;
	},

    toggleShrinkMap: function(e, force){
        this._map.toggleOpen(e, force);
    },

    toggleOpenContent: function(e, force){
        this._contentPanel.toggleOpen(e, force);
    },

    showAbout: function(e){
        e.preventDefault();
        $('.main-nav .active').removeClass('active');
        $(e.target).addClass('active');
        e.data.context.toggleOpenContent(e, true);
        e.data.context.toggleShrinkMap(e, true);
        $("#help").addClass('hide');
        $("#about").removeClass('hide');
    },

    showHelp: function(e){
        e.preventDefault();
        $('.main-nav .active').removeClass('active');
        $(e.target).addClass('active');
        e.data.context.toggleOpenContent(e, true);
        e.data.context.toggleShrinkMap(e, true);
        $("#about").addClass('hide');
        $("#help").removeClass('hide');
    },
});
