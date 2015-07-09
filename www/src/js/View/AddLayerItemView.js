'use strict';

App.View.AddLayerItem = Backbone.View.extend({

    _template: $('#addLayerPanel-layer_item_template').html(),
	className: 'layerItem',

	events: {
		'click .groupCheck': 'toggle'
	},

	initialize: function() {
		//this.render();
	},

	onClose: function() {
		// Remove events on close
		this.stopListening();
	},

	render: function() {
		this.model['name'] = this.model['name_' + App.lang];
        this.model['pdf'] = this.model['pdf_' + App.lang];
        this.model['page'] = this.model['page_' + App.lang];
		this.setElement(Mustache.render(this._template, this.model ));

        return this;
	},

	toggle: function(e) {
        e.stopPropagation();

        var $target = $(e.target);
        var id = $target.data('layerid');
        var layer = App.catalog.getLayerById(id);

        if ($target.is(':checked')) {
            App.currentLayers.add(layer);
        }else{
            App.currentLayers.remove(layer);
        }
	},
});
