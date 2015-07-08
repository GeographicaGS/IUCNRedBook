'use strict';

App.View.AddLayerGroup = Backbone.View.extend({

	_template : $('#addLayerPanel-layer_group_template').html(),
	className: 'layerItemGroup',

	events: {
		'click .toggle_btn': 'toggle'
	},

	initialize: function(options) {
		if(options && options.isLegend){
			this.isLegend = options.isLegend;
		}
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
			var layer = new App.View.AddLayerItem({model: this.model.layers[i]});
			this.$content.append(layer.render().$el);
		}
	},

	toggle: function(e) {
		e.preventDefault();
		var $target = $(e.currentTarget);
		if($target.hasClass('contracted')){
			$target.removeClass('contracted');
			this.$content.slideDown();
		}else{
			$target.addClass('contracted');
			this.$content.slideUp();
		}
	}
});
