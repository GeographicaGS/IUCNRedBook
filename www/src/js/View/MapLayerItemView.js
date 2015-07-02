'use strict';

App.View.MapLayerItem = Backbone.View.extend({

    _template: $('#mapLayerPanel-layer_item_template').html(),

	events: {
		'click label': 'toggleVisible',
        'click .marker': 'toggleVisible',
        'click .layer-clear': 'deleteLayer',
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

        return this;
	},

	toggleVisible: function(e) {
        e.preventDefault();
        //this.$el.toggleClass('on');
        this.model.set({'visible': !this.model.get('visible')});
        this.model.collection.trigger('update');
	},

    deleteLayer: function(e){
        if(e)
            e.preventDefault();
        App.currentLayers.remove(this.model);
    }
});
