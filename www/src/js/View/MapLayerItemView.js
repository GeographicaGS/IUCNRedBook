'use strict';

App.View.MapLayerItem = Backbone.View.extend({

    _template: $('#mapLayerPanel-layer_item_template').html(),

	events: {
		'click label': 'toggleVisible',
        'click .marker': 'toggleVisible',
        'click .layer-clear': 'deleteLayer',
        'change .layer-opacity-range': 'changeOpacity'
	},

	initialize: function() {
		//this.render();
	},

	onClose: function() {
		// Remove events on close
		this.stopListening();
	},

	render: function() {
		this.model.set({
            'name': this.model.get('name_' + App.lang),
            'pdf': this.model.get('pdf_' + App.lang),
            'page': this.model.get('page_' + App.lang)
        });
		this.setElement(Mustache.render(this._template, this.model.toJSON() ));

        if(this.model.get('visible')){
            this.$el.find('.layer-opacity-range').val(this.model.get('opacity')*100);
        }

        return this;
	},

	toggleVisible: function(e) {
        e.preventDefault();
        this.model.set({'visible': !this.model.get('visible')});
        this.model.collection.trigger('update');
	},

    deleteLayer: function(e){
        if(e)
            e.preventDefault();
        App.currentLayers.remove(this.model);
    },

    changeOpacity: function(e){
        if(e)
            e.stopPropagation();
        var opacity = e.target.value / 100;
        this.model.set({'opacity': opacity});
    },
});
