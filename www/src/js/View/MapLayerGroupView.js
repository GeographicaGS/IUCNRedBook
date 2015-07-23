'use strict';

App.View.MapLayerGroup = Backbone.View.extend({

	_template : $('#mapLayerPanel-layer_group_template').html(),
	className: 'layerItemGroup',

	events: {
		'click .layer-toggle': 'toggleChildren',
		'change .layer-opacity-range': 'opacityChildren'
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
		if(this.model.layers.length > 0){
			this.$el.removeClass('disabled');
			for (var i = 0; i < this.model.layers.length; i++ ){
				var layer = new App.View.MapLayerItem({model: this.model.layers[i]});
				this.$content.append(layer.render().$el);
			}
		}else{
			this.$el.addClass('disabled');
		}
	},

	toggleChildren: function(e) {
		e.preventDefault();
		var layers = this.$el.find('li');
		var allHidden = this.$el.find('li.on').length === 0;
		layers.each(function(index){
			$(this).toggleClass('on', allHidden);
			App.currentLayers.get($(this).data('layerid')).set({'visible': allHidden});
		});
	},

	opacityChildren: function(e) {
		e.preventDefault();
        e.stopPropagation();
        var opacity = e.target.value / 100;
		var layers = this.$el.find('li');
		layers.each(function(index){
			App.currentLayers.get($(this).data('layerid')).set({'opacity': opacity});
		});
	}
});
