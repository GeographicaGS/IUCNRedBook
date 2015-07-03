'use strict';

App.View.MapLayerGroup = Backbone.View.extend({

	_template : $('#mapLayerPanel-layer_group_template').html(),
	className: 'layerItemGroup',

	events: {
		'click .layer-toggle': 'toggleChildren'
	},

	initialize: function() {
		//this.render();
	},

	onClose: function() {
		// Remove events on close
		this.stopListening();
	},

	render: function() {
		this.model["title"] = this.model["title_" + App.lang]
		this.$el.html(Mustache.render(this._template, this.model ));
		// this.$el.html(this._template( {"title":this.model["title_" + app.lang] , "layers" :this.model.layers} ));

		this.$content = this.$('.content');
		if(this.model["title_" + App.lang] == ''){
			this.$('.groupName').remove();
		}

		this.renderGroup();

        return this;
	},

	renderGroup: function(){
		for (var i = 0; i < this.model.layers.length; i++ ){
			var layer = new App.View.MapLayerItem({model: this.model.layers[i]});
			this.$content.append(layer.render().$el);
		}
	},

	toggleChildren: function(e) {
		e.preventDefault();
		var layers = this.$el.find('li');
		console.log(layers);
		//App.currentLayers.get(layers)
	}
});
