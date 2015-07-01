'use strict';

App.View.LayerItem = Backbone.View.extend({

    _template: $('#layerPanel-layer_item_template').html(),
	className: 'layerItem',

	events: {
		'click input': 'toggle'
	},

	initialize: function() {
		//this.render();
	},

	onClose: function() {
		// Remove events on close
		this.stopListening();
	},

	render: function() {
		this.model["name"] = this.model["name_" + App.lang]
		this.$el.html(Mustache.render(this._template, this.model ));

		this.$info = this.$('.info');
		this.$addBtn = this.$('.add_btn');

		this.setAddBtnStatus();

        return this;
	},

	toggle: function(e) {
		e.preventDefault();
        var id = this.$addBtn.attr('layerid');

		if(this.$addBtn.hasClass('add')){
			this.trigger({
                type: 'layerAdd',
                layerId: id
            });
		}else{
            this.trigger({
                type: 'layerDel',
                layerId: id
            });
		}

		this.$info.toggleClass('show');
	},

	setAddBtnStatus: function() {
		if(Map.isLayerLoaded(this.model.id)){
			this.$addBtn.removeClass('add');
			this.$addBtn.html(this.$addBtn.attr('removelabel'));
		}
	}
});
